(function($) {

    function NeverEndingProgress(opts) {

        this.update_progress = function(progress) {
            this.current_progress = this.max_progress * progress;
            if (progress == 1) {
                this.start_auto_progress();
            };
            this.callback_progress();
        };

        this.finish = function() {
            this.current_progress = 1;
            this.callback_progress();
        };

        this.start_auto_progress = function() {
            this.auto_progress_time = new Date().getTime();
            var init_to_auto_time = this.auto_progress_time - this.start_time;
            this.expected_time = (init_to_auto_time / this.max_progress) * this.auto_progress_required;
            this.update_interval = (this.expected_time / 100) / this.auto_progress_required;
            this.auto_progress = 0;
            this.auto_interval();
        };

        this.auto_interval = function() {
            var self = this;
            this.auto_progress += 0.01;
            this.current_progress += 0.01;
            var interval_slowdown = (1 / Math.pow(0.99 - this.current_progress, 3));
            this.callback_progress();
            if (this.current_progress < 0.99) {
                this.interval = setTimeout(function(){
                    self.auto_interval();
                }, this.update_interval + interval_slowdown);  
            };
        }

        this.callback_progress = function() {
            if (typeof(this.progress_callback) == 'function') {
                this.progress_callback(this.current_progress);
            };
        };

        this.init = function() {
            this.current_progress = 0;
            this.max_progress = 0.7;
            $.extend(this, opts);
            this.auto_progress_required = (1 - this.max_progress);
            this.start_time = new Date().getTime();
        };
        this.init();

    }

    $.fn.never_ending_progress = function(max_progress, progress_callback) {

        var $this = $(this);
        $this.never_ending_progress = new NeverEndingProgress({
            max_progress: max_progress,
            progress_callback: progress_callback
        });
        return $this;

    }


})(jQuery);