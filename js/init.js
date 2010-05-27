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
            if (!session) {
                userStorage.setValue(key.val(), value.val());
            } else {
                userStorage.setSessionValue(key.val(), value.val());
            }
        } else {
            alert('Please enter both a key and a value');
        }
    });
    
    $('#search').click(function() {
        if (search.val() !== '') {
            var session = $('#search-session').is(':checked');
            if (!session) {
                var result = userStorage.getValue(search.val());
            } else {
                var result = userStorage.getSessionValue(search.val());
            }
            ans.html(search.val() + ' = ' + result);
        } else {
            alert('Please enter key to search for');
        }
    });
    
    $('#delete-btn').click(function() {
        if (del.val() !== '') {
            var session = $('#delete-session').is(':checked');
            if (!session) {
                userStorage.deleteValue(del.val());
            } else {
                userStorage.deleteSessionValue(del.val());
            }
        } else {
            alert('Please enter a key');
        }
    });
    
});