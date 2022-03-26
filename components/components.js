const {Cart} = require('../models/model');
const {Product} = require('../models/model');
const mongoose = require('mongoose');


exports.getAllProducts = (req,res,next)=>{
	Product.find()
		   .select('_id name price')
		   .exec()
		   .then(docs=>{
		   		console.log(docs);
		   		const response = {
		   			count:docs.length,
		   			products:docs.map(doc=>{
		   				return {
		   					_id:doc._id,
		   					name:doc.name,
		   					price:doc.price,
		   				}
		   			})
		   		}
		   		res.status(200).json(response);
		   })
		   .catch(err=>{
		   		console.log(err);
		   		res.status(500).json({
		   			error:err
		   		});
		   });
};

exports.postNewProduct = (req,res,next)=>{
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name:req.body.name,
		price : req.body.price
	});

	product.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message : 'Product Created Successfully!!',
			createdProduct:{
				_id:result._id,
				name:result.name,
				price:result.price,
			}
		});
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			error:err
		});
	});
};

exports.getProduct = (req,res,next)=>{
	var id = req.params.productId;
    console.log("give id", id);
	Product.findById(id)
		   .select('_id name price')
		   .exec()
		   .then(doc=>{
		   		console.log(doc);
		   		if(doc){
		   			res.status(200).json({
		   				product:doc,
		   			});
		   		}
		   		else{
		   			res.status(404).json({
		   				message:"No such Product Found!!"
		   			});
		   		}
		   })
		   .catch(err=>{
		   		console.log(err);
		   		res.status(500).json({
		   			error:err
		   		});
		   });
};

exports.updateProduct = (req,res,next)=>{
	const id = req.params.productId;
	const updateOps = {};
	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Product.update({_id:id},{$set:updateOps})
		   .exec()
		   .then(result=>{
		   		sstatus(200).json({
		   			message:"Product Updated Successfully",
		   		});
		   })
		   .catch(err=>{
		   		console.log(err);
		   		res.status(500).json(err=>{
		   			console.log(err);
		   			res.status(500).json({
		   				error:err
		   			});
		   		})
		   });
};

exports.deleteProduct = (req,res,next)=>{
	const id = req.params.productId;
	Product.remove({_id:id})
		   .exec()
		   .then(result =>{
		   		res.status(200).json({
		   			message:'Product Deleted',
		   		});
		   })
		   .catch(err=>{
		   		console.log(err);
		   		res.status(500).json({
		   			error : err
		   		});
		   });
};

exports.getAllOrders = (req,res,next)=>{
	Cart.find()
		 .select('_id product quatity')
		 .populate('product','name price')
		 .exec()
		 .then(docs=>{
		 	console.log(docs);
		 	res.status(200).json({
		 		count : docs.length,
		 		orders: docs.map(doc=>{
		 			return {
		 				_id:doc._id,
		 				product:doc.product,
		 				quantity:doc.quantity,
		 			}
		 		})
		 	});
		 })
		 .catch(err=>{
		 	console.log(err);
		 	res.status(500).json({
		 		error:err
		 	});
		 })
};

exports.postNewOrder = (req,res,next)=>{
	Product.findById(req.body.productId)
		   .then(product=>{
		   		if(!product){
		   			return res.status(404).json({
		   				message:'Product Not Found'
		   			});
		   		}
		   		else{
					const order = new Cart({
						_id: new mongoose.Types.ObjectId(),
						product:req.body.productId,
						quantity:req.body.quantity
					});
					return order.save();
		   		}
		   })
		   .then(result=>{
				res.status(201).json({
					message:"Cart Successfully Placed",
					createdOrder:{
						_id:result._id,
						product:result.product,
						quantity:result.quantity,
					},
				});	
			})
			.catch(err=>{
				// console.log(err);
			  	res.status(500).json({
			  		error:err
			  	});
			});
};

exports.getOrder = (req,res,next)=>{
	var id = req.params.orderId;
	Cart.findById(id)
		 .populate('product','_id name price')
		 .exec()
		 .then(order=>{
		 	if(!order){
		 		return res.status(404).json({
		 			message:"Cart Not Found!!!"
		 		});
		 	}
		 	res.status(200).json({
		 		order:order,
		 	});
		 })
		 .catch(err=>{
		 	res.status(500).json({
		 		error:err
		 	})
		 });
}

exports.deleteOrder = (req,res,next)=>{
	const orderId = req.params.orderId;
	Cart.remove({_id:orderId})
		 .exec()
		 .then(result=>{
		 	res.status(200).json({
		 		message:'Cart Deleted',
		 	});
		 })
		 .catch(err=>{
		 	res.status(500).json({
		 		error:err
		 	});
		 });
}