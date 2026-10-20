<?php

header('Content-Type: application/json');

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/ratelimit.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$body = json_decode(file_get_contents('php://input'), true) ?? [];

// Optional CORS (only needed if a different origin calls the API, e.g. local dev).
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $config['allowed_origins'] ?? [], true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
}
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}
header('X-Content-Type-Options: nosniff');

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

if ($method === 'GET' && $path === '/api/health') {
    echo json_encode([
        'status' => 'ok',
        'timestamp' => date('c'),
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

if ($method === 'POST' && $path === '/api/auth/login') {

    if (!rateLimit($pdo, 'login', 10, 15 * 60)) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many login attempts. Please try again later.']);
        exit;
    }

    $email = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
        http_response_code(400);

        echo json_encode([
            'error' => 'Email and password are required',
        ]);

        exit;
    }

    $stmt = $pdo->prepare(
        'SELECT id, email, password, name, role
         FROM Admin
         WHERE email = :email
         LIMIT 1'
    );

    $stmt->execute([
        ':email' => $email,
    ]);

    $admin = $stmt->fetch();

    if (!$admin || !password_verify($password, $admin['password'])) {
        http_response_code(401);

        echo json_encode([
            'error' => 'Invalid credentials',
        ]);

        exit;
    }

    $token = createJwt([
        'id' => $admin['id'],
        'email' => $admin['email'],
        'role' => $admin['role'],
    ]);

    echo json_encode([
        'token' => $token,
        'admin' => [
            'id' => $admin['id'],
            'email' => $admin['email'],
            'name' => $admin['name'],
            'role' => $admin['role'],
        ],
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Current Admin
|--------------------------------------------------------------------------
*/

if ($method === 'GET' && $path === '/api/auth/me') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);

        echo json_encode([
            'error' => 'Invalid or expired token',
        ]);

        exit;
    }

    $stmt = $pdo->prepare(
        'SELECT id, email, name, role
         FROM Admin
         WHERE id = :id
         LIMIT 1'
    );

    $stmt->execute([
        ':id' => $payload['id'],
    ]);

    $admin = $stmt->fetch();

    if (!$admin) {
        http_response_code(401);

        echo json_encode([
            'error' => 'Invalid or expired token',
        ]);

        exit;
    }

    echo json_encode([
        'admin' => $admin,
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Public Commodities
|--------------------------------------------------------------------------
*/

if ($method === 'GET' && $path === '/api/commodities') {

    $stmt = $pdo->query(
        "SELECT
            id,
            name,
            organicCertified,
            sourceOfCoffee,
            coffeeGrade,
            coffeeType,
            processingType,
            packagingContent,
            packageUnit,
            weightUnitCode,
            minOrderQty,
            description
         FROM CoffeeCommodity
         WHERE coffeeStatus = 'Green Bean'
         ORDER BY name ASC"
    );

    $commodities = $stmt->fetchAll();

    foreach ($commodities as &$commodity) {
        $commodity['organicCertified'] = (bool) $commodity['organicCertified'];
    }
    unset($commodity);

    echo json_encode([
        'commodities' => $commodities,
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Public Commodity by ID
|--------------------------------------------------------------------------
*/

if ($method === 'GET' && preg_match(
    '#^/api/commodities/([^/]+)$#',
    $path,
    $matches
)) {

    $id = $matches[1];

    $stmt = $pdo->prepare(
        "SELECT
            id,
            name,
            organicCertified,
            sourceOfCoffee,
            coffeeGrade,
            coffeeType,
            processingType,
            packagingContent,
            packageUnit,
            weightUnitCode,
            minOrderQty,
            description
         FROM CoffeeCommodity
         WHERE id = :id
         AND coffeeStatus = 'Green Bean'
         LIMIT 1"
    );

    $stmt->execute([
        ':id' => $id,
    ]);

    $commodity = $stmt->fetch();

    if (!$commodity) {
        http_response_code(404);

        echo json_encode([
            'error' => 'Not found',
        ]);

        exit;
    }

    $commodity['organicCertified'] = (bool) $commodity['organicCertified'];

    echo json_encode([
        'commodity' => $commodity,
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Public Contact Form
|--------------------------------------------------------------------------
*/

if ($method === 'POST' && $path === '/api/contact') {

    if (!rateLimit($pdo, 'contact', 5, 60 * 60)) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many submissions. Please try again later.']);
        exit;
    }

    $name = trim($body['name'] ?? '');
    $company = trim($body['company'] ?? '');
    $country = trim($body['country'] ?? '');
    $email = trim($body['email'] ?? '');
    $interest = trim($body['interest'] ?? '');
    $message = trim($body['message'] ?? '');

    /*
     * Validation
     */

    if ($name === '' || strlen($name) > 100) {
        http_response_code(400);

        echo json_encode([
            'error' => 'Invalid name',
        ]);

        exit;
    }

    if ($company !== '' && strlen($company) > 100) {
        http_response_code(400);

        echo json_encode([
            'error' => 'Invalid company',
        ]);

        exit;
    }

    if ($country !== '' && strlen($country) > 100) {
        http_response_code(400);

        echo json_encode([
            'error' => 'Invalid country',
        ]);

        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);

        echo json_encode([
            'error' => 'Invalid email',
        ]);

        exit;
    }

    if ($interest !== '' && strlen($interest) > 200) {
        http_response_code(400);

        echo json_encode([
            'error' => 'Invalid coffee interest',
        ]);

        exit;
    }

    if (strlen($message) < 10 || strlen($message) > 5000) {
        http_response_code(400);

        echo json_encode([
            'error' => 'Message must be between 10 and 5000 characters',
        ]);

        exit;
    }

    /*
     * Save submission
     */

    $id = bin2hex(random_bytes(12));

    $stmt = $pdo->prepare(
        "INSERT INTO ContactSubmission (
            id,
            name,
            company,
            country,
            email,
            coffeeInterest,
            message,
            status,
            createdAt,
            updatedAt
        )
        VALUES (
            :id,
            :name,
            :company,
            :country,
            :email,
            :coffeeInterest,
            :message,
            'new',
            :createdAt,
            :updatedAt
        )"
    );

    $now = nowIso();

    $stmt->execute([
        ':id' => $id,
        ':name' => $name,
        ':company' => $company !== '' ? $company : null,
        ':country' => $country !== '' ? $country : null,
        ':email' => $email,
        ':coffeeInterest' => $interest !== '' ? $interest : null,
        ':message' => $message,
        ':createdAt' => $now,
        ':updatedAt' => $now,
    ]);

    http_response_code(201);

    echo json_encode([
        'success' => true,
        'message' => 'Your inquiry has been received. We will respond within one business day.',
        'id' => $id,
    ]);

    exit;
}
/*
|--------------------------------------------------------------------------
| Public Site Content
|--------------------------------------------------------------------------
*/

if ($method === 'GET' && $path === '/api/content') {

    $stmt = $pdo->query(
        "SELECT
            id,
            key,
            value,
            section,
            updatedAt
         FROM SiteContent
         ORDER BY section ASC, key ASC"
    );

    $entries = $stmt->fetchAll();

    $content = [];

    foreach ($entries as $entry) {
        $section = $entry['section'];
        $key = $entry['key'];

        if (!isset($content[$section])) {
            $content[$section] = [];
        }

        $content[$section][$key] = $entry['value'];
    }

    echo json_encode([
        'content' => $content,
    ]);

    exit;
}
/*
|--------------------------------------------------------------------------
| Public Content by Section
|--------------------------------------------------------------------------
*/

if ($method === 'GET' && preg_match(
    '#^/api/content/([^/]+)$#',
    $path,
    $matches
)) {

    $section = urldecode($matches[1]);

    $stmt = $pdo->prepare(
        "SELECT
            key,
            value
         FROM SiteContent
         WHERE section = :section
         ORDER BY key ASC"
    );

    $stmt->execute([
        ':section' => $section,
    ]);

    $entries = $stmt->fetchAll();

    $content = [];

    foreach ($entries as $entry) {
        $content[$entry['key']] = $entry['value'];
    }

    echo json_encode([
        'content' => $content,
    ]);

    exit;
}

// Admin: Commodity statistics
if ($method === 'GET' && $path === '/api/admin/commodities/stats/overview') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $total = (int) $pdo
        ->query("SELECT COUNT(*) FROM CoffeeCommodity")
        ->fetchColumn();

    $available = (int) $pdo
        ->query("SELECT COUNT(*) FROM CoffeeCommodity WHERE coffeeStatus = 'Green Bean'")
        ->fetchColumn();

    $totalStock = (float) $pdo
        ->query("SELECT COALESCE(SUM(stockQuantity), 0) FROM CoffeeCommodity")
        ->fetchColumn();

    $totalSold = (float) $pdo
        ->query("SELECT COALESCE(SUM(quantitySold), 0) FROM CoffeeCommodity")
        ->fetchColumn();

    echo json_encode([
        'total' => $total,
        'available' => $available,
        'totalStock' => $totalStock,
        'totalSold' => $totalSold,
    ]);

    exit;
}

// Admin: Create commodity
if ($method === 'POST' && $path === '/api/admin/commodities') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $name = trim($body['name'] ?? '');
    $organicCertified = (bool) ($body['organicCertified'] ?? false);
    $sourceOfCoffee = trim($body['sourceOfCoffee'] ?? '');
    $coffeeGrade = trim($body['coffeeGrade'] ?? '');
    $coffeeType = trim($body['coffeeType'] ?? '');
    $coffeeStatus = $body['coffeeStatus'] ?? 'Green Bean';
    $processingType = trim($body['processingType'] ?? '');
    $packagingContent = trim($body['packagingContent'] ?? '');
    $packageUnit = trim($body['packageUnit'] ?? '');
    $weightUnitCode = $body['weightUnitCode'] ?? 'KG';
    $pricePerUnit = $body['pricePerUnit'] ?? null;
    $stockQuantity = $body['stockQuantity'] ?? 0;
    $availableQty = $body['availableQty'] ?? 0;
    $quantitySold = $body['quantitySold'] ?? 0;
    $minOrderQty = $body['minOrderQty'] ?? null;
    $description = $body['description'] ?? null;

    // Required fields
    if (
        $name === '' ||
        $sourceOfCoffee === '' ||
        $coffeeGrade === '' ||
        $coffeeType === '' ||
        $processingType === ''
    ) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Required fields are missing'
        ]);
        exit;
    }

    // Validate status
    if (!in_array($coffeeStatus, [
        'Green Bean',
        'Roast and Grind',
        'Other'
    ], true)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid coffee status'
        ]);
        exit;
    }

    // Validate weight unit
    if (!in_array($weightUnitCode, ['KG', 'LB'], true)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid weight unit'
        ]);
        exit;
    }

    // Validate numeric values
    foreach ([
        'stockQuantity' => $stockQuantity,
        'availableQty' => $availableQty,
        'quantitySold' => $quantitySold
    ] as $field => $value) {

        if (!is_numeric($value) || (float) $value < 0) {
            http_response_code(400);
            echo json_encode([
                'error' => "Invalid $field"
            ]);
            exit;
        }
    }

    if ($pricePerUnit !== null && !is_numeric($pricePerUnit)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid pricePerUnit'
        ]);
        exit;
    }

    if ($minOrderQty !== null && !is_numeric($minOrderQty)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid minOrderQty'
        ]);
        exit;
    }

    $id = bin2hex(random_bytes(12));
    $now = nowIso();

    $stmt = $pdo->prepare(
        "INSERT INTO CoffeeCommodity (
            id,
            name,
            organicCertified,
            sourceOfCoffee,
            coffeeGrade,
            coffeeType,
            coffeeStatus,
            processingType,
            packagingContent,
            packageUnit,
            weightUnitCode,
            pricePerUnit,
            stockQuantity,
            availableQty,
            quantitySold,
            minOrderQty,
            description,
            createdAt,
            updatedAt
        )
        VALUES (
            :id,
            :name,
            :organicCertified,
            :sourceOfCoffee,
            :coffeeGrade,
            :coffeeType,
            :coffeeStatus,
            :processingType,
            :packagingContent,
            :packageUnit,
            :weightUnitCode,
            :pricePerUnit,
            :stockQuantity,
            :availableQty,
            :quantitySold,
            :minOrderQty,
            :description,
            :createdAt,
            :updatedAt
        )"
    );

    $stmt->execute([
        ':id' => $id,
        ':name' => $name,
        ':organicCertified' => $organicCertified ? 1 : 0,
        ':sourceOfCoffee' => $sourceOfCoffee,
        ':coffeeGrade' => $coffeeGrade,
        ':coffeeType' => $coffeeType,
        ':coffeeStatus' => $coffeeStatus,
        ':processingType' => $processingType,
        ':packagingContent' => $packagingContent !== '' ? $packagingContent : null,
        ':packageUnit' => $packageUnit !== '' ? $packageUnit : null,
        ':weightUnitCode' => $weightUnitCode,
        ':pricePerUnit' => $pricePerUnit !== null ? (float) $pricePerUnit : null,
        ':stockQuantity' => (float) $stockQuantity,
        ':availableQty' => (float) $availableQty,
        ':quantitySold' => (float) $quantitySold,
        ':minOrderQty' => $minOrderQty !== null ? (float) $minOrderQty : null,
        ':description' => $description !== null ? trim((string) $description) : null,
        ':createdAt' => $now,
        ':updatedAt' => $now,
    ]);

    // Return the newly-created commodity
    $stmt = $pdo->prepare(
        "SELECT *
         FROM CoffeeCommodity
         WHERE id = :id
         LIMIT 1"
    );

    $stmt->execute([
        ':id' => $id
    ]);

    $commodity = $stmt->fetch();

    $commodity['organicCertified'] = (bool) $commodity['organicCertified'];
    $commodity['pricePerUnit'] = $commodity['pricePerUnit'] !== null
        ? (float) $commodity['pricePerUnit']
        : null;
    $commodity['stockQuantity'] = (float) $commodity['stockQuantity'];
    $commodity['availableQty'] = (float) $commodity['availableQty'];
    $commodity['quantitySold'] = (float) $commodity['quantitySold'];
    $commodity['minOrderQty'] = $commodity['minOrderQty'] !== null
        ? (float) $commodity['minOrderQty']
        : null;

    http_response_code(201);

    echo json_encode([
        'commodity' => $commodity
    ]);

    exit;
}

// Admin: Update commodity
if ($method === 'PUT' && preg_match(
    '#^/api/admin/commodities/([^/]+)$#',
    $path,
    $matches
)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $id = $matches[1];

    // Check that the commodity exists
    $check = $pdo->prepare(
        "SELECT id FROM CoffeeCommodity WHERE id = :id LIMIT 1"
    );

    $check->execute([':id' => $id]);

    if (!$check->fetch()) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Not found'
        ]);
        exit;
    }

    // Validate status if provided
    if (
        isset($body['coffeeStatus']) &&
        !in_array($body['coffeeStatus'], [
            'Green Bean',
            'Roast and Grind',
            'Other'
        ], true)
    ) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid coffee status'
        ]);
        exit;
    }

    // Validate weight unit if provided
    if (
        isset($body['weightUnitCode']) &&
        !in_array($body['weightUnitCode'], ['KG', 'LB'], true)
    ) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid weight unit'
        ]);
        exit;
    }

    // Fields allowed to be updated
    $allowedFields = [
        'name',
        'organicCertified',
        'sourceOfCoffee',
        'coffeeGrade',
        'coffeeType',
        'coffeeStatus',
        'processingType',
        'packagingContent',
        'packageUnit',
        'weightUnitCode',
        'pricePerUnit',
        'stockQuantity',
        'availableQty',
        'quantitySold',
        'minOrderQty',
        'description'
    ];

    $updates = [];
    $params = [];

    foreach ($allowedFields as $field) {

        if (!array_key_exists($field, $body)) {
            continue;
        }

        $value = $body[$field];

        if ($field === 'organicCertified') {
            $value = $value ? 1 : 0;
        }

        if (in_array($field, [
            'pricePerUnit',
            'stockQuantity',
            'availableQty',
            'quantitySold',
            'minOrderQty'
        ], true)) {

            if ($value !== null && !is_numeric($value)) {
                http_response_code(400);
                echo json_encode([
                    'error' => "Invalid $field"
                ]);
                exit;
            }

            if ($value !== null) {
                $value = (float) $value;
            }
        }

        $updates[] = "$field = :$field";
        $params[":$field"] = $value;
    }

    if (empty($updates)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'No fields to update'
        ]);
        exit;
    }

    $updates[] = 'updatedAt = :updatedAt';
    $params[':updatedAt'] = nowIso();
    $params[':id'] = $id;

    $sql = "
        UPDATE CoffeeCommodity
        SET " . implode(', ', $updates) . "
        WHERE id = :id
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Return updated commodity
    $stmt = $pdo->prepare(
        "SELECT *
         FROM CoffeeCommodity
         WHERE id = :id
         LIMIT 1"
    );

    $stmt->execute([':id' => $id]);

    $commodity = $stmt->fetch();

    $commodity['organicCertified'] = (bool) $commodity['organicCertified'];
    $commodity['pricePerUnit'] = $commodity['pricePerUnit'] !== null
        ? (float) $commodity['pricePerUnit']
        : null;
    $commodity['stockQuantity'] = (float) $commodity['stockQuantity'];
    $commodity['availableQty'] = (float) $commodity['availableQty'];
    $commodity['quantitySold'] = (float) $commodity['quantitySold'];
    $commodity['minOrderQty'] = $commodity['minOrderQty'] !== null
        ? (float) $commodity['minOrderQty']
        : null;

    echo json_encode([
        'commodity' => $commodity
    ]);

    exit;
}

// Admin: Get all commodities
if ($method === 'GET' && $path === '/api/admin/commodities') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $stmt = $pdo->query(
        "SELECT
            id,
            name,
            organicCertified,
            sourceOfCoffee,
            coffeeGrade,
            coffeeType,
            coffeeStatus,
            processingType,
            packagingContent,
            packageUnit,
            weightUnitCode,
            pricePerUnit,
            stockQuantity,
            availableQty,
            quantitySold,
            minOrderQty,
            description,
            createdAt,
            updatedAt
         FROM CoffeeCommodity
         ORDER BY createdAt DESC"
    );

    $commodities = $stmt->fetchAll();

    foreach ($commodities as &$commodity) {
        $commodity['organicCertified'] = (bool) $commodity['organicCertified'];
        $commodity['pricePerUnit'] = $commodity['pricePerUnit'] !== null
            ? (float) $commodity['pricePerUnit']
            : null;
        $commodity['stockQuantity'] = (float) $commodity['stockQuantity'];
        $commodity['availableQty'] = (float) $commodity['availableQty'];
        $commodity['quantitySold'] = (float) $commodity['quantitySold'];
        $commodity['minOrderQty'] = $commodity['minOrderQty'] !== null
            ? (float) $commodity['minOrderQty']
            : null;
    }

    unset($commodity);

    echo json_encode([
        'commodities' => $commodities
    ]);

    exit;
}

// Admin: Get one commodity
if ($method === 'GET' && preg_match(
    '#^/api/admin/commodities/([^/]+)$#',
    $path,
    $matches
)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $id = $matches[1];

    $stmt = $pdo->prepare(
        "SELECT
            id,
            name,
            organicCertified,
            sourceOfCoffee,
            coffeeGrade,
            coffeeType,
            coffeeStatus,
            processingType,
            packagingContent,
            packageUnit,
            weightUnitCode,
            pricePerUnit,
            stockQuantity,
            availableQty,
            quantitySold,
            minOrderQty,
            description,
            createdAt,
            updatedAt
         FROM CoffeeCommodity
         WHERE id = :id
         LIMIT 1"
    );

    $stmt->execute([
        ':id' => $id
    ]);

    $commodity = $stmt->fetch();

    if (!$commodity) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Not found'
        ]);
        exit;
    }

    $commodity['organicCertified'] = (bool) $commodity['organicCertified'];
    $commodity['pricePerUnit'] = $commodity['pricePerUnit'] !== null
        ? (float) $commodity['pricePerUnit']
        : null;
    $commodity['stockQuantity'] = (float) $commodity['stockQuantity'];
    $commodity['availableQty'] = (float) $commodity['availableQty'];
    $commodity['quantitySold'] = (float) $commodity['quantitySold'];
    $commodity['minOrderQty'] = $commodity['minOrderQty'] !== null
        ? (float) $commodity['minOrderQty']
        : null;

    echo json_encode([
        'commodity' => $commodity
    ]);

    exit;
}

// Admin: Delete commodity
if ($method === 'DELETE' && preg_match(
    '#^/api/admin/commodities/([^/]+)$#',
    $path,
    $matches
)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $id = $matches[1];

    $stmt = $pdo->prepare(
        "SELECT id
         FROM CoffeeCommodity
         WHERE id = :id
         LIMIT 1"
    );

    $stmt->execute([
        ':id' => $id
    ]);

    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Not found'
        ]);
        exit;
    }

    $stmt = $pdo->prepare(
        "DELETE FROM CoffeeCommodity
         WHERE id = :id"
    );

    $stmt->execute([
        ':id' => $id
    ]);

    http_response_code(204);
    exit;
}

// Admin: Get contact submissions
if ($method === 'GET' && $path === '/api/admin/contacts') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $status = $_GET['status'] ?? '';
    $page = max(1, (int) ($_GET['page'] ?? 1));
    $limit = (int) ($_GET['limit'] ?? 20);

    // Keep limit between 1 and 100
    $limit = max(1, min(100, $limit));

    $offset = ($page - 1) * $limit;

    // Build filter
    $where = '';
    $params = [];

    if ($status !== '') {
        $where = 'WHERE status = :status';
        $params[':status'] = $status;
    }

    // Total count
    $countStmt = $pdo->prepare(
        "SELECT COUNT(*)
         FROM ContactSubmission
         $where"
    );

    $countStmt->execute($params);
    $total = (int) $countStmt->fetchColumn();

    // Get submissions
    $stmt = $pdo->prepare(
        "SELECT
            id,
            name,
            company,
            country,
            email,
            coffeeInterest,
            message,
            status,
            notes,
            createdAt,
            updatedAt
         FROM ContactSubmission
         $where
         ORDER BY createdAt DESC
         LIMIT :limit OFFSET :offset"
    );

    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }

    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

    $stmt->execute();

    $submissions = $stmt->fetchAll();

    echo json_encode([
        'submissions' => $submissions,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'pages' => $total > 0 ? (int) ceil($total / $limit) : 0,
        ],
    ]);

    exit;
}

// Admin: Contact statistics
if ($method === 'GET' && $path === '/api/admin/contacts/stats/overview') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $total = (int) $pdo
        ->query("SELECT COUNT(*) FROM ContactSubmission")
        ->fetchColumn();

    $new = (int) $pdo
        ->query("SELECT COUNT(*) FROM ContactSubmission WHERE status = 'new'")
        ->fetchColumn();

    $read = (int) $pdo
        ->query("SELECT COUNT(*) FROM ContactSubmission WHERE status = 'read'")
        ->fetchColumn();

    $replied = (int) $pdo
        ->query("SELECT COUNT(*) FROM ContactSubmission WHERE status = 'replied'")
        ->fetchColumn();

    echo json_encode([
        'total' => $total,
        'new' => $new,
        'read' => $read,
        'replied' => $replied,
    ]);

    exit;
}

// Admin: Get one contact submission
if ($method === 'GET' && preg_match(
    '#^/api/admin/contacts/([^/]+)$#',
    $path,
    $matches
)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $id = $matches[1];

    $stmt = $pdo->prepare(
        "SELECT
            id,
            name,
            company,
            country,
            email,
            coffeeInterest,
            message,
            status,
            notes,
            createdAt,
            updatedAt
         FROM ContactSubmission
         WHERE id = :id
         LIMIT 1"
    );

    $stmt->execute([
        ':id' => $id
    ]);

    $submission = $stmt->fetch();

    if (!$submission) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Not found'
        ]);
        exit;
    }

    // Opening a new submission marks it as read
    if ($submission['status'] === 'new') {

        $stmt = $pdo->prepare(
            "UPDATE ContactSubmission
             SET status = 'read',
                 updatedAt = :updatedAt
             WHERE id = :id"
        );

        $stmt->execute([
            ':id' => $id,
            ':updatedAt' => nowIso()
        ]);

        $submission['status'] = 'read';
    }

    echo json_encode([
        'submission' => $submission
    ]);

    exit;
}

// Admin: Update contact submission
if ($method === 'PATCH' && preg_match(
    '#^/api/admin/contacts/([^/]+)$#',
    $path,
    $matches
)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $id = $matches[1];

    // Check that the submission exists
    $check = $pdo->prepare(
        "SELECT id
         FROM ContactSubmission
         WHERE id = :id
         LIMIT 1"
    );

    $check->execute([
        ':id' => $id
    ]);

    if (!$check->fetch()) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Not found'
        ]);
        exit;
    }

    $updates = [];
    $params = [];

    // Update status
    if (array_key_exists('status', $body)) {

        $status = $body['status'];

        if (!in_array($status, [
            'new',
            'read',
            'replied',
            'archived'
        ], true)) {
            http_response_code(400);
            echo json_encode([
                'error' => 'Invalid status'
            ]);
            exit;
        }

        $updates[] = 'status = :status';
        $params[':status'] = $status;
    }

    // Update notes
    if (array_key_exists('notes', $body)) {

        $notes = $body['notes'];

        if ($notes !== null) {
            $notes = trim((string) $notes);
        }

        $updates[] = 'notes = :notes';
        $params[':notes'] = $notes;
    }

    if (empty($updates)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'No fields to update'
        ]);
        exit;
    }

    $updates[] = 'updatedAt = :updatedAt';
    $params[':updatedAt'] = nowIso();
    $params[':id'] = $id;

    $stmt = $pdo->prepare(
        "UPDATE ContactSubmission
         SET " . implode(', ', $updates) . "
         WHERE id = :id"
    );

    $stmt->execute($params);

    // Return updated submission
    $stmt = $pdo->prepare(
        "SELECT
            id,
            name,
            company,
            country,
            email,
            coffeeInterest,
            message,
            status,
            notes,
            createdAt,
            updatedAt
         FROM ContactSubmission
         WHERE id = :id
         LIMIT 1"
    );

    $stmt->execute([
        ':id' => $id
    ]);

    $submission = $stmt->fetch();

    echo json_encode([
        'submission' => $submission
    ]);

    exit;
}

// Admin: Delete contact submission
if ($method === 'DELETE' && preg_match(
    '#^/api/admin/contacts/([^/]+)$#',
    $path,
    $matches
)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $id = $matches[1];

    $stmt = $pdo->prepare(
        "DELETE FROM ContactSubmission
         WHERE id = :id"
    );

    $stmt->execute([
        ':id' => $id
    ]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Not found'
        ]);
        exit;
    }

    http_response_code(204);
    exit;
}

// Admin: Get all site content
if ($method === 'GET' && $path === '/api/admin/content') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $stmt = $pdo->query(
        "SELECT
            id,
            key,
            value,
            section,
            updatedAt
         FROM SiteContent
         ORDER BY section ASC, key ASC"
    );

    $entries = $stmt->fetchAll();

    echo json_encode([
        'entries' => $entries
    ]);

    exit;
}

// Admin: Get content by section
if ($method === 'GET' && preg_match(
    '#^/api/admin/content/section/([^/]+)$#',
    $path,
    $matches
)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $section = urldecode($matches[1]);

    $stmt = $pdo->prepare(
        "SELECT
            id,
            key,
            value,
            section,
            updatedAt
         FROM SiteContent
         WHERE section = :section
         ORDER BY key ASC"
    );

    $stmt->execute([
        ':section' => $section
    ]);

    $entries = $stmt->fetchAll();

    echo json_encode([
        'entries' => $entries
    ]);

    exit;
}

// Admin: Get content by key
if ($method === 'GET' && preg_match(
    '#^/api/admin/content/key/([^/]+)$#',
    $path,
    $matches
)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $key = urldecode($matches[1]);

    $stmt = $pdo->prepare(
        "SELECT
            id,
            key,
            value,
            section,
            updatedAt
         FROM SiteContent
         WHERE key = :key
         LIMIT 1"
    );

    $stmt->execute([
        ':key' => $key
    ]);

    $entry = $stmt->fetch();

    if (!$entry) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Not found'
        ]);
        exit;
    }

    echo json_encode([
        'entry' => $entry
    ]);

    exit;
}

// Admin: Create or update site content
if ($method === 'POST' && $path === '/api/admin/content') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $key = trim($body['key'] ?? '');
    $value = isset($body['value'])
        ? (string) $body['value']
        : '';
    $section = trim($body['section'] ?? '');

    // Validate required fields
    if ($key === '' || strlen($key) > 200) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid key'
        ]);
        exit;
    }

    if ($section === '' || strlen($section) > 50) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid section'
        ]);
        exit;
    }

    // Check whether this key already exists
    $check = $pdo->prepare(
        "SELECT id
         FROM SiteContent
         WHERE key = :key
         LIMIT 1"
    );

    $check->execute([
        ':key' => $key
    ]);

    $existing = $check->fetch();

    $now = nowIso();

    if ($existing) {

        // Update existing entry
        $stmt = $pdo->prepare(
            "UPDATE SiteContent
             SET value = :value,
                 section = :section,
                 updatedAt = :updatedAt
             WHERE key = :key"
        );

        $stmt->execute([
            ':value' => $value,
            ':section' => $section,
            ':updatedAt' => $now,
            ':key' => $key
        ]);

        $id = $existing['id'];

    } else {

        // Create new entry
        $id = bin2hex(random_bytes(12));

        $stmt = $pdo->prepare(
            "INSERT INTO SiteContent (
                id,
                key,
                value,
                section,
                updatedAt
            )
            VALUES (
                :id,
                :key,
                :value,
                :section,
                :updatedAt
            )"
        );

        $stmt->execute([
            ':id' => $id,
            ':key' => $key,
            ':value' => $value,
            ':section' => $section,
            ':updatedAt' => $now
        ]);
    }

    // Return the saved entry
    $stmt = $pdo->prepare(
        "SELECT
            id,
            key,
            value,
            section,
            updatedAt
         FROM SiteContent
         WHERE key = :key
         LIMIT 1"
    );

    $stmt->execute([
        ':key' => $key
    ]);

    $entry = $stmt->fetch();

    echo json_encode([
        'entry' => $entry
    ]);

    exit;
}

// Admin: Bulk update site content
if ($method === 'PUT' && $path === '/api/admin/content/bulk') {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $entries = $body['entries'] ?? null;

    if (!is_array($entries) || empty($entries)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Entries are required'
        ]);
        exit;
    }

    $savedEntries = [];

    try {

        $pdo->beginTransaction();

        foreach ($entries as $entry) {

            $key = trim($entry['key'] ?? '');
            $value = isset($entry['value'])
                ? (string) $entry['value']
                : '';
            $section = trim($entry['section'] ?? '');

            if ($key === '' || strlen($key) > 200) {
                throw new Exception('Invalid key');
            }

            if ($section === '' || strlen($section) > 50) {
                throw new Exception('Invalid section');
            }

            $check = $pdo->prepare(
                "SELECT id
                 FROM SiteContent
                 WHERE key = :key
                 LIMIT 1"
            );

            $check->execute([
                ':key' => $key
            ]);

            $existing = $check->fetch();

            $now = nowIso();

            if ($existing) {

                $stmt = $pdo->prepare(
                    "UPDATE SiteContent
                     SET value = :value,
                         section = :section,
                         updatedAt = :updatedAt
                     WHERE key = :key"
                );

                $stmt->execute([
                    ':value' => $value,
                    ':section' => $section,
                    ':updatedAt' => $now,
                    ':key' => $key
                ]);

            } else {

                $id = bin2hex(random_bytes(12));

                $stmt = $pdo->prepare(
                    "INSERT INTO SiteContent (
                        id,
                        key,
                        value,
                        section,
                        updatedAt
                    )
                    VALUES (
                        :id,
                        :key,
                        :value,
                        :section,
                        :updatedAt
                    )"
                );

                $stmt->execute([
                    ':id' => $id,
                    ':key' => $key,
                    ':value' => $value,
                    ':section' => $section,
                    ':updatedAt' => $now
                ]);
            }

            // Get saved entry
            $stmt = $pdo->prepare(
                "SELECT
                    id,
                    key,
                    value,
                    section,
                    updatedAt
                 FROM SiteContent
                 WHERE key = :key
                 LIMIT 1"
            );

            $stmt->execute([
                ':key' => $key
            ]);

            $savedEntries[] = $stmt->fetch();
        }

        $pdo->commit();

    } catch (Exception $e) {

        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        http_response_code(400);

        echo json_encode([
            'error' => $e->getMessage()
        ]);

        exit;
    }

    echo json_encode([
        'entries' => $savedEntries
    ]);

    exit;
}

// Admin: Delete site content by key
if ($method === 'DELETE' && preg_match('#^/api/admin/content/(.+)$#', $path, $matches)) {

    $payload = getAuthenticatedAdmin();

    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Invalid or expired token'
        ]);
        exit;
    }

    $key = urldecode($matches[1]);

    if ($key === '') {
        http_response_code(400);
        echo json_encode([
            'error' => 'Content key is required'
        ]);
        exit;
    }

    $stmt = $pdo->prepare(
        "DELETE FROM SiteContent
         WHERE key = :key"
    );

    $stmt->execute([
        ':key' => $key
    ]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Not found'
        ]);
        exit;
    }

    http_response_code(204);
    exit;
}

/*
|--------------------------------------------------------------------------
| Not Found
|--------------------------------------------------------------------------
*/

http_response_code(404);

echo json_encode([
    'error' => 'Not found',
]);