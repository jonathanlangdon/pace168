<?php
    // Define the path to your git repository
    $repoPath = '/home/yourusername/public_html/yourrepository';

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
