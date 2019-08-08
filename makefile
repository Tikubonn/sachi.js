
all:
	make js/sachi.min.js

.always:

test: .always
	make -C test

js/sachi.min.js: js/sachi.js
	closure --compilation_level ADVANCED --assume_function_wrapper --jscomp_off=checkVars --js js/sachi.js --js_output_file js/sachi.min.js
