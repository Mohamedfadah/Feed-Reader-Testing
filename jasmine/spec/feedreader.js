﻿/* feedreader.js
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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* this make some loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('it has a URL defined and the URL is not empty', function() {
			for(var j=0; j<allFeeds.length; j++){
					expect(allFeeds[j].url).toBeDefined();
					expect(allFeeds[j].url).not.toBe('');
			}
		});

        /* this make some loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('allFeeds has name defined and not empty', function() {
			for(var j=0;j<allFeeds.length;j++){
				expect(allFeeds[j].name).toBeDefined();
				expect(allFeeds[j].name).not.toBe('');
			}
		});
    });


    /* it's a new test suite named "The menu" */
	describe('The menu', function(){
        /* this test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		 
		it('menu element is hidden by default', function(){
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
		
         /* this test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('menu changes visibility when the menu icon is clicked', function(){
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			//this to test menu hide when clicked again
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});	
    /* it's a new test suite named "Initial Entries" */
	describe('Initial Entries', function(){
        /* this test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		 beforeEach(function(done){
			loadFeed(0, done);
		});
		it('loadFeed function has a single .entry element', function(done){
			expect($('.feed .entry').length >0).toBe(true);
			done();
		});
	});
    /* it's a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function(){
        /* this test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		var feed;
        var newFeed;
		beforeEach(function(done){
			loadFeed(0, function(){
				feed = $('.feed').html();
				loadFeed(1, function(){
					newFeed = $('.feed').html();
					done();
				});
			});
		});
		it('content changes', function(){
			expect(feed).not.toEqual(newFeed);
		});
	});
}());
