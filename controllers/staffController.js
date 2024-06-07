import staffModel from "../models/staffModel.js";
import fs from "fs";
export const createstaffController = async (req, res) => {
  try {
    const {
      name,
      contact,
      address,
      state,
      fatherName,
      motherName,
      email,
      empId,
      designation,
      department,
      adharCardNo,
      panNo,
      drivingLicence,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName,
      salaryAmount,
    } = req.fields;

    const { photo, panCard } = req.files;
    const adharCards = Object.values(req.files.adharCard || {});

    let photoData = null;
    let pancardData = null;
    let adharcardData=[];

    if (photo) {
      photoData = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    if (panCard) {
      pancardData = {
        data: fs.readFileSync(panCard.path),
        contentType: panCard.type,
      };
    }

    // Handling multiple Adhar Card images
    if (adharCards.length > 0) {
      for (const adharCard of adharCards) {
        const data = {
          data: fs.readFileSync(adharCard.path),
          contentType: adharCard.type,
        };
        
        adharcardData.push(data);
      }
    }

    const requiredFields = [
      "name",
      "contact",
      "address",
      "state",
      "fatherName",
      "motherName",
      "email",
      "empId",
      "designation",
      "department",
      "adharCardNo",
      "panNo",
      "drivingLicence",
      "bankName",
      "accountNumber",
      "ifscCode",
      "accountHolderName",
      "salaryAmount",
    ];

    const missingFields = requiredFields.filter((field) => !req.fields[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const existingStaff = await staffModel.findOne({ $or: [{ email }, { empId }] });
    if (existingStaff) {
      return res.status(400).send({
        success: false,
        message: "This staff already exists with the provided email or empId",
      });
    }

    const newStaff = await staffModel.create({
      photo: photoData,
      adharCards: adharcardData,
      panCard: pancardData,
      name,
      contact,
      address,
      state,
      fatherName,
      motherName,
      email,
      empId,
      designation,
      department,
      adharCardNo,
      panNo,
      drivingLicence,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName,
      salaryAmount,
    });

    return res.status(201).send({
      success: true,
      message: "Staff created successfully",
      data: newStaff,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};




export const manageStaffController = async (req, res) => {
  try {
    const data = await staffModel.find();
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

export const deleteStaffController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await staffModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Staff not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Staff deleted successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

export const manageSingleStaffController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await staffModel.find({ _id });
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Staff Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};


export const createProductController = async (req, res) => {
  try {
    const {
      pricedata,
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      color,
      brand,
      discount,
      subcategory,
      baseCategory,
      feature,
      seller_id,
      serialNo,
      productId,
    } = req.fields;
    const photo = Object.values(req.files);
    //validation

    switch (true) {
      case !baseCategory:
        return res.send({
          message: "base Category is Required",
          success: false,
        });
      case !category:
        return res.send({ message: "category is Required", success: false });
      case !serialNo:
        return res.send({ message: "serialNo is Required", success: false });
      case !productId:
        return res.send({ message: "productId is Required", success: false });
      case !seller_id:
        return res.send({ message: "seller id is Required", success: false });
      case !subcategory:
        return res.send({ message: "Subcategory is Required", success: false });
      case !pricedata:
        return res.send({ message: "priceData is Required", success: false });
      case !name:
        return res.send({ message: "Name is Required", success: false });
      case !description:
        return res.send({ message: "Description is Required", success: false });
      case !price:
        return res.send({ message: "Price is Required", success: false });

      case !discount:
        return res.send({ message: "Discount is Required", success: false });
    }

    // //(pricedata,"this is price data which is passing for the purpose of testing ...!")

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    let photoCount = 0;
    for (const p of photo) {
      if (photoCount >= 10) {
        return res.send({ message: "Maximum 10 photos allowed" });
      }

      if (p.size > 1000000) {
        return res
          .status(500)
          .send({ message: "Photo should be less than 1MB" });
      }
      // Read the image file and set it to the product
      const imageBuffer = fs.readFileSync(p.path);
      products.photo.push({ data: imageBuffer, contentType: p.type });
      photoCount++;
    }


    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    //(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

// get photo
// export const productPhotoController = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.pid).select("photo");
//     if (product.photo) {
//       res.set("Content-type", product.photo[0].contentType);
//       return res.status(200).send(product.photo[0].data);
//     }
//   } catch (error) {
//     //(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr while getting photo",
//       error,
//     });
//   }
// };








