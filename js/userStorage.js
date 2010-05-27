var userStorage = function() {
    
    //object variables
    var localSupport       = null,
        sessionSupport     = null,
        userSupport        = null,
        obj                = null,
        ieDb               = 'userStorage',
        seshObj            = null,
        seshDb             = null;
    
    //private functions
    /**
     * Detects Inernet explorer versions 5.5 --> 7
     * used to test for userData functionality
     */
    function detectIE() {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //test for MSIE x.x;
            var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
            if (ieversion>=5.5 && ieversion<=8) {
                return true;
            }
        }
        return false;
    }
    
    //public functions
    return { 
        /**
         * Init function for the object; sets up all variables and dom elements
         * Especially important for IE.
         */
        init : function() {
            if (typeof(localStorage) === 'object') {
                localSupport = true;
                
                if (typeof(sessionStorage) === 'object') {
                    sessionSupport = true;
                }
            
            } else if (detectIE()) {
                
                alert('hey!');
                
                userSupport = true;
                
                //setup IE localStorage database
                var newdiv = document.createElement('div');
                newdiv.setAttribute('id','ie-db');
                body.appendChild(newdiv);
                obj = document.getElementById('ie-db');
                obj.className = 'userData';
                obj.style.display = 'none';
                
                //setup IE sessionStorage database
                if (window.name === null || window.name === undefined || window.name === '') {
                  window.name = 'ie-db-' + new Date().getTime();
                }
                var ieWindow = window.name;
                newdiv = document.createElement('div');
                newdiv.setAttribute('id', ieWindow);
                obj.appendChild(newdiv);
                seshObj = document.getElementById(ieWindow);
                seshObj.className = 'userData';
                seshObj.style.display = 'none';
                seshDb  = 'seshStorage' + ieWindow;
                
            }
        },
        
        /**
         * Sets a value into storage.
         * 
         * @param key     This is the key
         * @param value   This is the value
         * @param session If set to true, the key value pair is stored in the window session, not the browser session.
         */
        setValue : function(key, value, session) {
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
        },
        
        /**
         * Gets a value from storage.
         * 
         * @param  key     This is the key to search for
         * @param  session If set to true, searches in the window sesion as opposed to the browser.
         * @return string
         */    
        getValue : function(key, session) {
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
        },
        
        /**
         * Deletes the value from storage.
         * 
         * @param  key     This is the key to search for
         * @param  session If set to true, searches in the window sesion as opposed to the browser.
         * @return string
         */    
        deleteValue : function(key, session) {
            session = (session === null || session === undefined || session === false) ? false : true;
            
            if (localSupport) {
                setValue(key,null,session);
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
        
    }; //end return
    
    /* TODO's
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
    
}();