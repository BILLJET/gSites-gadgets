function main()
{
    var prefs = new gadges.Prefs();
    name = prefs.GetString("name");
    var html = "";

    if(name)
    {
        html = "<h1>" + name + "</h1>";
    }
    else
    {
        html = "test name";
    }
     document.getElementById("content_div").innerHTML = html;
}
