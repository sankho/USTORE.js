/*********************************************************

This file handles all DOM events for the USTORE.js demo.
It is not necessary to use USTORE.js - this file is merely
an example of how one could use USTORE.js. jQuery is used
to make everything easier and a little more readable.

Note that the first call upon dom ready is to USTORE.init()

**********************************************************/

$(document).ready(function() {
    
    //step one: run the init function to determine & setup DOM storage support
    USTORE.init();
    
    //clear all inputs
    $('input[type="text"]').val('');
    
    //setup some global variables
    var key     = $('#key');
    var value   = $('#value');
    var search  = $('#search-key');
    var ans     = $('#ans');
    var del     = $('#delete');
    
    /**
     * clicking the "#save" submit button will save a value
     * if the session checkbox is checked, then the value
     * will be saved into session storage
    */
    $('#save').click(function(e) {
        e.preventDefault();
        if (key.val() !== '' && value.val() !== '') {
            var session = $('#session').is(':checked');
            if (!session) {
                USTORE.setValue(key.val(), value.val());
            } else {
                USTORE.setSessionValue(key.val(), value.val());
            }
        } else {
            alert('Please enter both a key and a value');
        }
    });
    
    /**
     * clicking the "#search" submit button will get a key's value
     * if the session checkbox is checked, then the key will be searched
     * within the sessionStorage. If no value is found, it shoudl return
     * as null.
    */
    $('#search').click(function(e) {
        e.preventDefault();
        if (search.val() !== '') {
            var session = $('#search-session').is(':checked');
            if (!session) {
                var result = USTORE.getValue(search.val());
            } else {
                var result = USTORE.getSessionValue(search.val());
            }
            ans.html(search.val() + ' = ' + result);
        } else {
            alert('Please enter key to search for');
        }
    });
    
    /**
     * clicking the "#delete-btn" submit button will delete a key's value
     * if the session checkbox is checked, then the value will be deleted
     * from session storage
    */
    $('#delete-btn').click(function(e) {
        e.preventDefault();
        if (del.val() !== '') {
            var session = $('#delete-session').is(':checked');
            if (!session) {
                USTORE.deleteValue(del.val());
            } else {
                USTORE.deleteSessionValue(del.val());
            }
        } else {
            alert('Please enter a key');
        }
    });
    
    /**
     * clicking the "#clear-both" button will clear both session & local
     * storage
    */
    $('#clear-both').click(function(e) {
        e.preventDefault();
        USTORE.clearDOMStorage();
    });
    
    /**
     * clicking the "#clear-local" button will clear the local storage
    */
    $('#clear-local').click(function(e) {
        e.preventDefault();
        USTORE.clearLocalStorage();
    });
    
    /**
     * clicking the "#clear-session" button will clear the session storage
    */
    $('#clear-session').click(function(e) {
        e.preventDefault();
        USTORE.clearSessionStorage();
    });
    
});