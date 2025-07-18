## Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

solution =>     let count = 0;
                
                def counter() {
                    count++;

                    setTimeout(counter, 1000);
                }

                counter();



















































(Hint: setTimeout)