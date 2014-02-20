jquery-fsortable
===========

#### IMPORTANT NOTE

The sortable plugin currently has 2 bugs that affect this plugin when working
with connected sortables.

The first bug causes over and out events to not be triggered properly when
using connected sortables. See http://bugs.jqueryui.com/ticket/9335 for more
details.

The second bug causes change events to trigger on the sender list, rather
than on the current list, when dragging an item from a connected sortable.
See http://bugs.jqueryui.com/ticket/9760 for more details.

If you don't need connected sortables then you can use this plugin as is.
However, if you do require that functionality, then please use the following
repo until the fixes land upstream.
https://github.com/NiGhTTraX/jquery-ui/tree/experimental


Building
--------

Fsortable uses the [Grunt](https://github.com/gruntjs/grunt) build system. To build Fsortable, you must have [node.js](https://github.com/joyent/node) installed and then run the following commands:

```bash
# Install the Grunt CLI.
npm install -g grunt-cli

# Clone the repository.
git clone git@github.com:NiGhTTraX/jquery-fsortable.git
cd jquery-fsortable

# Install node module dependencies.
npm install

# Run the build task.
grunt
```

If all went well, you will find a minified version of the plugin in the ```build/``` folder.


Testing
-------

Run ```grunt test``` to run the tests in
[PhantomJS](https://github.com/ariya/phantomjs) or open ```tests/index.html```
to run them in your browser. Tests are written using the
[QUnit](http://www.qunitjs.com/) framework and the [jQuery Event Unit Testing
Helpers](https://github.com/jquery/jquery-simulate).

To enable coverage, place the ```resources/``` and ```tests/``` folders in your
webserver and run the tests from there with the coverage option in QUnit checked
(running coverage locally will throw a cross-domain error). Coverage is done
using [blanket.js](http://www.blanketjs.org).
