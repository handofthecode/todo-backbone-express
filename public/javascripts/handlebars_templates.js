this["JST"] = this["JST"] || {};

this["JST"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"tint\"></div><div id=\"modal\">	<form data-edit-id=\"0\">		<div class=\"form_group\">			<label for=\"title\">Title</label>			<input id=\"title\" type=\"text\" maxlength=\"18\" name=\"title\" placeholder=\"Title\">		</div>		<div class=\"form_group\">			<label for=\"day\">Due Date</label>			<div class=\"input_group\">				<input id=\"day\" type=\"number\" min=\"1\" max=\"31\" name=\"day\" placeholder=\"Day\">				/ <input id=\"month\" type=\"number\" min=\"1\" max=\"12\" name=\"month\" placeholder=\"Month\">				/ <input id=\"year\" type=\"number\" name=\"year\" min=\"2017\" placeholder=\"Year\">				<span id=\"notification\"></span>			</div>		</div>		<div class=\"form_group\">			<label for=\"description\">Description</label>			<textarea id=\"description\" maxlength=\"100\" placeholder=\"Description\"></textarea>		</div>		<input id=\"submit\" type=\"button\" class=\"button\" value=\"Save\"><!--	--><input id=\"mark-as-complete\" type=\"button\" class=\"button\" value=\"Mark As Complete\">	</form></div>";
},"useData":true});

this["JST"]["nav"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<li class=\"nav\" data-nav-id=\""
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "\">			<dl>			<dt>"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</dt>			<dd>"
    + alias4(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "</dd>			</dl>			</li>		";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<li class=\"nav\" data-nav-id=\""
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "-completed\">			<dl>			<dt>"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</dt>			<dd>"
    + alias4(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "</dd>			</dl>			</li>		";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<dl id=\"all-todos\" class=\"nav nav_heading nav_selected\" data-nav-id=\"All Todos\">	<dt><span id=\"nav_h_todos\">All Todos</span></dt>	<dd class=\"todo-count\">"
    + alias4(((helper = (helper = helpers.totalCount || (depth0 != null ? depth0.totalCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalCount","hash":{},"data":data}) : helper)))
    + "</dd></dl><nav class=\"nav_todo\">	<ul id=\"nav-todo-list\">		"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.group : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul></nav><dl id=\"completed\" class=\"nav nav_heading\" data-nav-id=\"Completed\">	<dt><span id=\"nav_h_completed\">Completed</span></dt>	<dd id=\"completed-count\">"
    + alias4(((helper = (helper = helpers.completedCount || (depth0 != null ? depth0.completedCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"completedCount","hash":{},"data":data}) : helper)))
    + "</dd></dl><nav class=\"nav_todo\">	<ul id=\"nav-completed-list\">		"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.completedGroup : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul></nav>";
},"useData":true});

this["JST"]["todoList"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<li class=\"todo"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.complete : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">			<a class=\"todo-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</a>			<a class=\"delete\"><img src=\"/images/delete.png\" alt=\"delete\"></a>		</li>	";
},"2":function(container,depth0,helpers,partials,data) {
    return " complete";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<dl class=\"main_heading\">	<dt id=\"heading\">All Todos</dt>	<dd id=\"display-count\" class=\"todo-count\">"
    + container.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "</dd></dl><!--TODOS--><a id=\"add_todo\"><h3>Add new todo</h3></a><ul id=\"todo-display\">	"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.todos : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});