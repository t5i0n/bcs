<?php

require_once __DIR__ . '/bootstrap.php';

function base64UrlEncode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode(string $data): string
{
    $data = strtr($data, '-_', '+/');

    $padding = strlen($data) % 4;

    if ($padding > 0) {
        $data .= str_repeat('=', 4 - $padding);
    }

    return base64_decode($data);
}

function createJwt(array $payload): string
{
    global $config;

    $header = [
        'alg' => 'HS256',
        'typ' => 'JWT',
    ];

    $payload['iat'] = time();
    $payload['exp'] = time() + $config['jwt_expiration'];

    $headerEncoded = base64UrlEncode(json_encode($header));
    $payloadEncoded = base64UrlEncode(json_encode($payload));

    $signature = hash_hmac(
        'sha256',
        $headerEncoded . '.' . $payloadEncoded,
        $config['jwt_secret'],
        true
    );

    return $headerEncoded . '.' .
           $payloadEncoded . '.' .
           base64UrlEncode($signature);
}

function verifyJwt(string $token): ?array
{
    global $config;

    $parts = explode('.', $token);

    if (count($parts) !== 3) {
        return null;
    }

    [$header, $payload, $signature] = $parts;

    $expectedSignature = base64UrlEncode(
        hash_hmac(
            'sha256',
            $header . '.' . $payload,
            $config['jwt_secret'],
            true
        )
    );

    if (!hash_equals($expectedSignature, $signature)) {
        return null;
    }

    $decodedPayload = json_decode(
        base64UrlDecode($payload),
        true
    );

    if (!is_array($decodedPayload)) {
        return null;
    }

    if (isset($decodedPayload['exp']) && $decodedPayload['exp'] < time()) {
        return null;
    }

    return $decodedPayload;
}

function getAuthenticatedAdmin(): ?array
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if (!str_starts_with($header, 'Bearer ')) {
        return null;
    }

    $token = substr($header, 7);

    return verifyJwt($token);
}