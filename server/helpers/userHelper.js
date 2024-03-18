
const promise = require('promise');
const { mongoose } = require('mongoose');

const fs = require('fs');
const path = require('path');

const user = {
    f_userName: String,
    f_Pwd: String,

   
}
const userModel = mongoose.model("t_login", user)

const employee = {
    f_Image: String,
    f_Name: String,
    f_Mobile: String,
    f_Email : String,
    f_Designation: String,
    f_Gender: String,
    f_Course: String,
    f_Createdate: String,


}

const employeeModel = mongoose.model("t_Employee", employee)

module.exports = {

  
    Login: (userData) => {
        return new Promise(async(resolve, reject) => {
          
            userModel.findOne({f_userName : userData.username }).lean().then(async(user) => {
                if (user) {

                    if (user.f_Pwd == userData.Pass) {
                        
                        resolve({user : user})
                    }else {
                        
                        resolve({ massage : "Wrong Password!" })
                   }

                } else {
                    
                    resolve({ massage : "user not found!" })
                }
             })
           
        })
    },
    AddEmployee: (data, filename) => {
        
        return new Promise((resolve, reject) => {
            emp = employeeModel({
                f_Image: filename,
                f_Name: data.name,
                f_Email : data.email,
                f_Mobile: data.mobile,
                f_Designation: data.designation,
                f_Gender: data.gender,
                f_Course: data.course,
                f_Createdate: new Date().toString().slice(4, 15),
            })
            emp.save().then((res) => {
                console.log(res);
                resolve(true)
            }).catch(()=> {
              reject()  
            })
        })
    },
    getAllEmployeee: () => {
        return new Promise((resolve, reject) => {
            employeeModel.find().lean().then((data) => {
                resolve(data)
            })
        })
    },
    getEmployeee: (id) => {
        return new Promise((resolve, reject) => {
            
            employeeModel.findOne({ _id: id }).then((data) => {
                resolve(data)
            })
        })
    },
    Editemployee: (data, filename) => {
        return new Promise(async (resolve, reject) => {
           
            employeeModel.findOne({ _id: data.id }).then((emp) => {
                fs.access(path.join(__dirname, '../upload', emp.f_Image), fs.constants.F_OK,async (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        fs.unlink(path.join(__dirname, '../upload', emp.f_Image),async (err) => {
                            if (err) {
                                reject(err)
                            } else {
                                
                                
                                
                                   employeeModel.findOneAndUpdate({
                                       _id: data.id,
                                   }, {
                                       f_Image: filename,
                                       f_Name: data.name,
                                       f_Email: data.email,
                                       f_Mobile: data.mobile,
                                       f_Designation: data.designation,
                                       f_Gender: data.gender,
                                       f_Course: data.course,
                                   }).then(() => {
                                       resolve()
                                   })
                               
                                  

                                
                                

                            }

                        });
                    }

                    
                    
                });
                
            })
        
           

       })
    },
    deleteEmployeee: (id) => {
        return new Promise((resolve, reject) => {
            employeeModel.findOne({ _id: id }).then((data) => {
                fs.access(path.join(__dirname, '../upload', data.f_Image), fs.constants.F_OK, async (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        fs.unlink(path.join(__dirname, '../upload', data.f_Image), async (err) => {
                            if (err) {
                                reject(err)
                            } else {


                                employeeModel.deleteOne({
                                    _id: id
                                }).then(() => {
                                    resolve()
                                }).catch(() => {
                                    reject()
                                })


                            }

                        });
                    }



                });

            })
        })
    },
    checkemailExist: (email) => {
        return new Promise((resolve, reject) => {
            employeeModel.findOne({ f_Email: email }).then((data) => {
                if (data) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
}