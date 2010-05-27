$(document).ready(function() {
    
    userStorage.init();
    
    $('input[type="text"]').val('');
    
    var key     = $('#key'),
        value   = $('#value'),
        search  = $('#search-key'),
        ans     = $('#ans'),
        del     = $('#delete'); 
    
    
    $('#save').click(function() {
        if (key.val() !== '' && value.val() !== '') {
            var session = $('#session').is(':checked');
            userStorage.setValue(key.val(), value.val(), session);
        } else {
            alert('Please enter both a key and a value');
        }
    });
    
    $('#search').click(function() {
        if (search.val() !== '') {
            var session = $('#search-session').is(':checked');
            var result = userStorage.getValue(search.val(), session);
            ans.html(search.val() + ' = ' + result);
        } else {
            alert('Please enter key to search for');
        }
    });
    
    $('#delete-btn').click(function() {
        if (del.val() !== '') {
            var session = $('#delete-session').is(':checked');
            userStorage.deleteValue(del.val(), session);
        } else {
            alert('Please enter a key');
        }
    });
    
});