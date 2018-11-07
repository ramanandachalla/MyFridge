var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'), //mondo db
bodyParser = require('body-parser'), //POST method parse data
methodOverride = require('method-override'); //POST manipulation

//using use function process request
//method-override for copy paste
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // verify encode url and delete 
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//develop REST API operations for food
router.route('/')
    //GET all foods
    .get(function(req, res, next) {
        //retrieve all foods from Monogo databse
        mongoose.model('Food').find({}, function (err, foods) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to HTML and JSON format
                  res.format({
                      //HTML Response
                    html: function(){
                        res.render('foods/index', {
                              title: 'Food List',
                              "foods" : foods
                          });
                    },
                    //JSON response
                    json: function(){
                        res.json(foods);
                    }
                });
              }     
        });
    })
    //POST a new food
    .post(function(req, res) {
        // Add new food
        var name = req.body.name;
        var date = req.body.date;
        var expiry = req.body.expiry;
        var left_overs = req.body.left_overs;
		var quantity = req.body.quantity;
        //call create food 
        mongoose.model('Food').create({
            name : name,
            date : date,
            expiry : expiry,
			left_overs:left_overs,
            quantity : quantity
        }, function (err, food) {
              if (err) {
                  res.send("Database Issue");
              } else {
                  //food created
                  console.log('New Food with POST: ' + food);
                  res.format({
                      //HTML Response
                    html: function(){
                        // foods
                        res.location("foods");
                        // And forward to success page
                        res.redirect("/foods");
                    },
                    //JSON response 
                    json: function(){
                        res.json(food);
                    }
                });
              }
        })
    });

/* GET New Food */
router.get('/new', function(req, res) {
    res.render('foods/new', { title: 'Add New Food Item' });
});

// route validate food with id
router.param('id', function(req, res, next, id) {
    //find by food ID in db
    mongoose.model('Food').findById(id, function (err, c) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //continue if food id found 
        } else {
             // after validation save food 
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Food').findById(req.id, function (err, food) {
      if (err) {
        console.log('problem in get food data: ' + err);
      } else {
        console.log('GET Food ID: ' + food._id);
        var fooddate = food.date.toISOString();
        fooddate = fooddate.substring(0, fooddate.indexOf('T'))
		var foodexpiry = food.expiry.toISOString();
        foodexpiry = foodexpiry.substring(0, foodexpiry.indexOf('T'))
        res.format({
          html: function(){
              res.render('foods/show', {
                "fooddate" : fooddate,
				"foodexpiry" : foodexpiry,
                "food" : food
              });
          },
          json: function(){
              res.json(food);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET food based on food id
	.get(function(req, res) {
	    //find food in database
	    mongoose.model('Food').findById(req.id, function (err, food) {
	        if (err) {
	            console.log('problem in get food data: ' + err);
	        } else {
	            //Return food data
	            console.log('GET Food ID: ' + food._id);
              var fooddate = food.date.toISOString();
              fooddate = fooddate.substring(0, fooddate.indexOf('T'))
			  var foodexpiry = food.expiry.toISOString();
              foodexpiry = foodexpiry.substring(0, foodexpiry.indexOf('T'))
	            res.format({
	                //HTML response with update food
	                html: function(){
	                       res.render('foods/edit', {
	                          title: 'Food' + food._id,
                            "fooddate" : fooddate,
							"foodexpiry" : foodexpiry,
	                          "food" : food
	                      });
	                 },
	                 //JSON response 
	                json: function(){
	                       res.json(food);
	                 }
	            });
	        }
	    });
	})
	//PUT to update with food id
	.put(function(req, res) {
	    // Get food values
	    var name = req.body.name;
	    var date = req.body.date;
	    var expiry = req.body.expiry;
	    var left_overs = req.body.left_overs;
	    var quantity = req.body.quantity;

	    //find the document by ID
	    mongoose.model('Food').findById(req.id, function (err, food) {
	        //update it
	        food.update({
	            name : name,
	            date : date,
	            expiry : expiry,
	            left_overs : left_overs,
				quantity:quantity
	        }, function (err, foodID) {
	          if (err) {
	              res.send("Database Issue " + err);
	          } 
	          else {
	                  //HTML response
	                  res.format({
	                      html: function(){
	                           res.redirect("/foods/" + food._id);
	                     },
	                     //JSON response
	                    json: function(){
	                           res.json(food);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE food based on id
	.delete(function (req, res){
	    //find food id
	    mongoose.model('Food').findById(req.id, function (err, food) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            food.remove(function (err, food) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success after delete
	                    console.log('DELETE Food ID: ' + food._id);
	                    res.format({
	                        //HTML response
	                          html: function(){
	                               res.redirect("/foods");
	                         },
	                         //JSON response
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   item : food
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;