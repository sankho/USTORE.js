# USTORE.js

##a cross browser javascript based local & session storage solution

###Written by Sankho Mallik for HUGE inc, smallik@hugeinc.com

##Contents

###=1. Description
###=2. Package Contents
###=3. Usage
###=4. Documentation
###=5. Contact info

##=1. DESCRIPTION

USTORE.js is a simple javascript file that allows for cross browser client side storage. This
was written to provide a realistic way to begin employing localStorage and sessionStorage, 
both of which have been introduced in the new HTML5 spec. Native support is available in the
latest versions of FF, Safari, and Chrome, and only IE8 supports. To work in IE6+, USTORE.js 
uses a behavoir Microsoft created called userData, which allows for client side storage. To
enable sessionStorage to work via userData, a custom window.name attribute is created. So it
should be noted that if another script is setting a value to window.name, USTORE.js *may*
not work in terms of sessionStorage on IE6 & IE7.

##=2. PACKAGE CONTENTS

Here's a breakdown of the contents of this package:

>* README
>* USTORE.js
>* demo/
>>* index.html
>>* init.js
  
And that should be it!

##=3. USAGE

Please see USTORE.js for usage instructions. For explicit examples, check out the demo/ folder 
and it's contents. Light knowledge of jQuery may be required to understand the init.js file.

##=4. DOCUMENTATION

For now... you're looking at it. More official docs are on the way. Some light documentation is
made in USTORE.js.

##=5. CONTACT INFO

Feel free to email me with any questions at smallik@hugeinc.com