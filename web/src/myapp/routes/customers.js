/*
 * GET customers listing.
 */
exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM tgc_maestra',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('customers',{page_title:"Customers - Node.js",data:rows});
                           
         });
       
    });
  
};
exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers-Node.js"});
};
exports.edit = function(req, res){
    
  var id = req.params.id;
    
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM tgc_maestra WHERE business_group = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
                           
         });
                 
    }); 
};
/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            pep    : input.pep,
			tenant_id : input.tenant_id
            tenant_name : input.tenant_name,
            policy   : input.policy,
            coste_vcpu   : input.coste_vcpu, 
			coste_vram   : input.coste_vram,
			coste_stg_cap   : input.coste_stg_cap,
			coste_stg_opt   : input.coste_stg_opt,
			coste_stg_perf   : input.coste_stg_perf,
			coste_stg_extrem   : input.coste_stg_extrem,
			contratomarco : input.contratomarco
        
        };
        
        var query = connection.query("INSERT INTO tgc_maestra set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};/*Save edited customer*/
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
       var data = {
            
            pep    : input.pep,
			tenant_id : input.tenant_id
            tenant_name : input.tenant_name,
            policy   : input.policy,
            coste_vcpu   : input.coste_vcpu, 
			coste_vram   : input.coste_vram,
			coste_stg_cap   : input.coste_stg_cap,
			coste_stg_opt   : input.coste_stg_opt,
			coste_stg_perf   : input.coste_stg_perf,
			coste_stg_extrem   : input.coste_stg_extrem,
			contratomarco : input.contratomarco
        
        };
        
        connection.query("UPDATE tgc_maestra set ? WHERE business_group = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};

exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM tgc_maestra  WHERE business_group = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};
