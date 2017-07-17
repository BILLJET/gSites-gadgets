// Get userprefs
    var prefs = new gadgets.Prefs();

    // Get the array of search terms entered by the user
    var terms = prefs.getArray("mylist");
    var html = "";

    // If the user has not added any terms yet, display message.
    if (terms.length == 0)
    {
      html += "Edit the userprefs to add terms.";
    }
    else {
      html += "Your terms are:<br /><br />";
      for (var i = 0; i < terms.length ; i++) {
        var term = (terms[i]);
        html += term + "<br />";
      }
    }
    document.getElementById("content_div").innerHTML = html;