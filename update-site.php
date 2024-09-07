<?php
    $secret = 'Heckyeahwewantssecrets385';
    
    // Retrieve the GitHub signature header
    $githubSignature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? $_SERVER['HTTP_X_HUB_SIGNATURE'] ?? null;
    
    // Log headers for debugging (optional, remove later)
    file_put_contents('php://stderr', print_r(getallheaders(), true));

    // Ensure the signature is not null
    if ($githubSignature === null) {
        http_response_code(400);
        die('Signature header missing');
    }

    // Generate our hash for comparison
    $signature = 'sha256=' . hash_hmac('sha256', file_get_contents('php://input'), $secret);

    // Verify the request signature
    if (!hash_equals($signature, $githubSignature)) {
        http_response_code(403);
        die('Invalid signature');
    }

    // Define the path to your git repository
    $repoPath = '/home/newhulings/public_html/pace168.com';

    // Change directory to the repository
    chdir($repoPath);

    // Pull the latest changes
    exec('git pull 2>&1', $output, $return);

    // Output the result for logging purposes
    if ($return === 0) {
        echo "Git Pull Successful: " . implode("\n", $output);
    } else {
        echo "Git Pull Failed: " . implode("\n", $output);
    }
?>
