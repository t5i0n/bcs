<?php

require_once __DIR__ . '/database.php';

$stmt = $pdo->query('SELECT id, name, coffeeStatus FROM CoffeeCommodity');

$rows = $stmt->fetchAll();

echo json_encode($rows, JSON_PRETTY_PRINT);