/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Validate that allFeeds is defined and that it contains at least one value.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Validate allFeeds object to ensure it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function () {
            for (feednumber = 0; feednumber < allFeeds.length; feednumber++) {
                expect(allFeeds[feednumber].url).toBeDefined();
                expect(allFeeds[feednumber].url.length).toBeGreaterThan(0);
            }
        });


        /* Validate allFeeds object to ensure it has a name defined
         * and that the name is not empty.
         */
        it('have names', function () {
            for (feednumber = 0; feednumber < allFeeds.length; feednumber++) {
                expect(allFeeds[feednumber].name).toBeDefined();
                expect(allFeeds[feednumber].name.length).toBeGreaterThan(0);
            }
        });
    });

    // Validate The Menu object
    describe('The menu', function () {

        // Validate that the menu element is hidden by default (done by body having a class of menu-hidden).
        it('menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        // Validate that the menu element is shown when the menu icon is clicked.
        it('shows when clicked', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
        });

        // Validate that the menu element is hidden when the menu icon is clicked a second time.
        it('hides when clicked again', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });

    // Validate the Initial Entries
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () { done(); } );
        });

        // Validate that loadFeed() loads at least one .entry item
        it('at least a single .entry element in .feed container', function (done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    // Validate New Feed Selection
    describe('New Feed Selection', function () {
        var feedData;

        beforeEach(function (done) {
            // Save current feed data (URL 0) and compare with URL 1
            feedData = $('.feed').html();
            loadFeed(1, function () { done(); });
        });

        // Validate that loadFeed() casues a change of the items by comparing URL 0 with URL 1 content
        it('new feed data is loaded', function (done) {
            expect(feedData).not.toEqual($('.feed').html());
            done();
        });
    });

}());