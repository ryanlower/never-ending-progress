Never Ending Progress
=====================

Plugin to fake progress of part of a progress indicator and ensure it never quite finishes
For example, when uploading a file and doing backend processing


Usage
---------------

Setup never ending progress with your best guess of real / fake progress ratio, e.g. 0.7:

    var progress = $.fn.never_ending_progress(0.7, function(progress){
        console.log('progress is ' + progress)
    });

Update known progress upto 100%:

    progress.never_ending_progress.update_progress(0.5);
    \\ progress is 0.35
    progress.never_ending_progress.update_progress(0.9);
    \\ progress is 0.63
    progress.never_ending_progress.update_progress(1);
    \\ progress is 0.7

Never Ending Progress now takes over and does the last 30% for you at approximately the same speed, slowing down to ensure it never gets to 100%.

And when you're done:

    progress.never_ending_progress.finish();
    \\ progress is 1