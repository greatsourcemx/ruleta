/*
Solution for:
https://codepen.io/netcraft/pen/jENxgY?editors=001
*/
function init_rotate() {

    (function() {
        var getNumsFromRange,
            hitMe,
            slots;

        /**
         * Return an array with 3 random numbers within
         * the specified range.
         * Resulting numbers should be positive, whole integers.
         */
        getNumsFromRange = function(min, max) {
            var getRandomInt,
                swap;

            // Handle only 1 argument passed
            if (typeof max === 'undefined') {
                max = min;
                min = 0;
            }

            // Handle negative values
            if (min < 0) {
                min = Math.abs(min);
            }
            if (max < 0) {
                max = Math.abs(max);
            }

            // Handle swapped range
            if (min > max) {
                swap = min;
                min = max;
                max = swap;
            }

            getRandomInt = function() {
                // +1 needed to make Max inclusive
                // See http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            return [getRandomInt(), getRandomInt(), getRandomInt()];
        };

        //----------------------------------------------------------
        // Tests
        //----------------------------------------------------------
        // Passing negative numbers should result in a positive range
        // console.log(getNumsFromRange(-1, -9));
        // Support specifiying the range in reverse order
        // console.log(getNumsFromRange(9, 1));
        // Support passing only 1 argument to specifiy a range from 0
        // console.log(getNumsFromRange(9));

        //----------------------------------------------------------
        // Do not touch the code below
        //----------------------------------------------------------
        slots = document.querySelectorAll('#slots span');
        hitMe = document.querySelector('#hitMe');
        hitMe.counter = 0;

        // On button click (Enter as well)
        hitMe.addEventListener('click', function(e) {
            // Get lucky numbers, range 0-9
            var nums = getNumsFromRange(0, 9);

            e.preventDefault();

            // Spin each slot
            [].forEach.call(slots, function(elm, inx, arr) {
                setTimeout(function() {
                    // Trigger CSS transform
                    elm.classList.toggle('spin');

                    // If we have 3 lucky numbers
                    if (Array.isArray(nums) && nums.length === 3) {
                        // Inject the number, delay for effect
                        setTimeout(function() {
                            var tries,
                                winner;

                            // Do we have a winner
                            if (inx === slots.length - 1) {
                                // tries = document.querySelector('#tries');
                                // Count how many tries
                                hitMe.counter++;

                                if (nums[0] === nums[1] &&
                                    nums[1] === nums[2]) {}
                            }
                        }, 335);
                    }
                }, inx * 100);
            });
        });
        hitMe2 = document.querySelector('#hitMe2');
        hitMe2.counter = 0;

        // On button click (Enter as well)
        hitMe2.addEventListener('click', function(e) {
            // Get lucky numbers, range 0-9
            var nums = getNumsFromRange(0, 9);

            e.preventDefault();

            // Spin each slot
            [].forEach.call(slots, function(elm, inx, arr) {
                setTimeout(function() {
                    // Trigger CSS transform
                    elm.classList.toggle('spin');

                    // If we have 3 lucky numbers
                    if (Array.isArray(nums) && nums.length === 3) {
                        // Inject the number, delay for effect
                        setTimeout(function() {
                            var tries,
                                winner;

                            // Do we have a winner
                            if (inx === slots.length - 1) {
                                // tries = document.querySelector('#tries');
                                // Count how many tries
                                hitMe2.counter++;

                                if (nums[0] === nums[1] &&
                                    nums[1] === nums[2]) {}
                            }
                        }, 335);
                    }
                }, inx * 100);
            });
        });
    }());
}