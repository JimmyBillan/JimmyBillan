var domain = {uri : "http://"+window.location.hostname+"/"};
domain.longueur= domain.uri.length;

var View = {

    listIdView : ["portfolio","networks","about-me"],

    hideAllViews: function() {
        for (var i = 0; i < this.listIdView.length; i++) {
            document.getElementById(this.listIdView[i]).style.display="none";   
        };
    },
    updateNav : function() {

    },
    showPortfolio: function() {
        View.hideAllViews();
        document.getElementById("portfolio").style.display="block";
       
    },
    showNetworks: function() {
        View.hideAllViews();
        document.getElementById("networks").style.display="block";
       
    },
    showAboutMe: function() {
        View.hideAllViews();
        document.getElementById("about-me").style.display="block";
        
    }
}

var Router = {
    routes: [
        {
            path:'#portfolio',
            f : View.showPortfolio
        },
        {
            path:'#networks',
            f : View.showNetworks
        },{
            path:'#about-me',
            f : View.showAboutMe
        }
    ],

    current: window.location.href,
    listen: function() {
    	self = this;
        var fn = function() {
            var href = window.location.href;
        	if(self.current != href){
                var uri = href.substr(domain.longueur, href.length);
        		self.current = window.location.href;
                self.isValidRoute(uri);
        	}            
        } 
        setInterval(fn, 50);
    },

    isValidRoute: function(uri) {
        var routeValided = false;
        var routePosition = -1;

        for (var i = 0; i < this.routes.length; i++) {
            if(this.routes[i].path == uri){
                routeValided = true;
                routePosition = i;
            }
        };

        if(routeValided){
            window.location.href = this.current.replace(/#(.*)$/, '') + this.routes[routePosition].path;
            this.routes[routePosition].f();
        }else{
            this.moveTo(this.routes[0].path);
        }
    },
    moveTo: function(uri) {
        this.isValidRoute(uri);
    }
}

Router.listen();
Router.moveTo(Router.routes[0].path);