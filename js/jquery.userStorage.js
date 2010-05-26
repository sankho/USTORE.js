(function($) {
    
    var localSupport   = false;
    var sessionSupport = false;
    var userSupport    = false;
        
    if (typeof(localStorage) === 'object') {
        localSupport = true;
        
        if (typeof(sessionStorage) === 'object') {
            sessionSupport = true;
        }
    
    } else if ($.browser.msie) { // check for versions, eh?
        
        userSupport = true;
        
        //setup IE localStorage database
        var markup = '<div id="ie-db" style="display:none !important;" class="userData"></div>';
        $('body').append(markup);
        var obj = $('#ie-db')[0];
        var ieDb = 'userStorage';
        
        //setup IE sessionStorage database
        if (window.name === null || window.name === undefined || window.name === '') {
          window.name = 'ie-db-' + new Date().getTime();
        }
        var ieWindow = window.name;
        markup = '<div id="' + ieWindow + '" class="userData"></div>';
        $('#ie-db').append(markup);
        var seshObj = $('#' + ieWindow)[0];
        var seshDb  = 'seshStorage' + ieWindow;
        
    }
    
    /**
     * Sets a value into storage.
     * 
     * @param key     This is the key
     * @param value   This is the value
     * @param session If set to true, the key value pair is stored in the window session, not the browser session.
     */
    var setValue = function(key, value, session) {
        session = (session === null || session === undefined || session === false) ? false : true;
        
        if (localSupport) {
            if (session && sessionSupport) {
                sessionStorage.setItem(key, value);
            } else {
                localStorage.setItem(key, value);
            }
        } else if (userSupport) {
            if (session) {
                seshObj.setAttribute(key,value);
                seshObj.save(seshDb);
            } else {
                obj.setAttribute(key, value);
                obj.save(ieDb);
            }
        }
    }

    /**
     * Gets a value from storage.
     * 
     * @param  key     This is the key to search for
     * @param  session If set to true, searches in the window sesion as opposed to the browser.
     * @return string
     */    
    var getValue = function(key, session) {
        session = (session === null || session === undefined || session === false) ? false : true;
        
        var result = '';
        if (localSupport) {
            if (session && sessionSupport) {
                result = sessionStorage.getItem(key);
            } else {
                result = localStorage.getItem(key);
            }
        } else if (userSupport) {
            if (session) {
                seshObj.load(seshDb);
                result = seshObj.getAttribute(key);
            } else {
                obj.load(ieDb);
                result = obj.getAttribute(key);
            }
        }
        return result;
    }

    /**
     * Deletes the value from storage.
     * 
     * @param  key     This is the key to search for
     * @param  session If set to true, searches in the window sesion as opposed to the browser.
     * @return string
     */    
    var deleteValue = function(key, session) {
        session = (session === null || session === undefined || session === false) ? false : true;
        
        if (localSupport) {
            this.setValue(key,null,session);
        } else if (userSupport) {
            if (session) {
                seshObj.removeAttribute(key);
                seshObj.save(seshDb);
            } else {
                obj.removeAttribute(key);
                obj.save(ieDb);
            }    
        }
    }
    
    /*********************************************
    * # TODO - write a clear all values function *
      # TODO - time constraints
      # TODO - cookie fallbacks
      # TODO - subdomain / domain issues
      # TODO - examine sql
      # TODO - explore memory limit issues
      # TODO - look into performance problems w/ setting IE behavoir
      # TODO - convert to pure javascript independent of libraries
      # TODO - create wrapper functions for setting/getting/deleteing
               session vars
    *********************************************/
    
    $.userStorage = {
        setValue    : setValue,
        getValue    : getValue,
        deleteValue : deleteValue
    }
    
});