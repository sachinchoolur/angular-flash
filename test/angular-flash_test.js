describe('Unit testing angular flash', function() {
    var $compile,
        $rootScope,
        $timeout,
        node,
        Flash;

    // Load the myApp module, which contains the directive
    beforeEach(module('flash'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _Flash_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        Flash = _Flash_;
    }));

    beforeEach(function() {
        node = $compile('<div><flash-message duration=1000></flash-message></div>')($rootScope);
    });

    it('Replaces the element with the appropriate content', function() {
        var contents = node.contents();
        expect(contents[0].nodeType).toEqual(Node.ELEMENT_NODE);
    });

    it('Has the class specified', function() {
        var testClassName = 'test-class';
        Flash.create('success', 'Good job', 10000, testClassName);
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert')[0].classList).toContain(testClassName);
    });

    it('Shows the flash when created and removes when deleted', function() {
        Flash.create('success', 'All good');
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert').length).toEqual(1);
        Flash.dismiss(0);
        $rootScope.$digest();
        expect(contents.querySelectorAll('.alert').length).toEqual(0);
    });

    it('Clears all when clear is called', function() {
        for (var i = 0; i < 10; ++i) {
            Flash.create('success', 'All good');
        }
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert').length).toEqual(10);
        Flash.clear();
        $rootScope.$digest();
        expect(contents.querySelectorAll('.alert').length).toEqual(0);
    });

    it('Is dismissed after timeout', function() {
        Flash.create('success', 'All good', 10000);
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert').length).toEqual(1);

        $timeout.flush();
        $rootScope.$digest();
        expect(contents.querySelectorAll('.alert').length).toEqual(0);
    });
});
