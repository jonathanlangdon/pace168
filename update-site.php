<?php
    $secret = 'Heckyeahwewantssecrets385';
    $signature = 'sha256=' . hash_hmac('sha256', file_get_contents('php://input'), $secret);

    // Verify the request signature
    if (!hash_equals($signature, $_SERVER['HTTP_X_HUB_SIGNATURE_256'])) {
        http_response_code(403);
        die('Invalid signature');
    }

    // Define the path to your git repository
    $repoPath = '/home/newhulings/public_html/pace168';

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
