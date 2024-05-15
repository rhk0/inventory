import companyModel from "../models/companyModel.js";

export const registerController = async(req, res) => {
    try {
        const { businessName,
            address,
            b_state,
            country,
            pinCode,
            contact,
            email,
            website,
            financialYear,
            bookFrom,
            s_state,
            tax_Rate,
            taxable_value,
            gstIn,
            e_way_bill,
            enableTds,
            tanRegistrationNo,
            tanNo,
            deductorType} = req.body;
        const requiredFields = [
            'businessName',
            'address',
            'b_state',
            'country',
            'pinCode',
            'contact',
            'email',
            'website',
            'financialYear',
            'bookFrom',
            's_state',
            'tax_Rate',
            'taxable_value',
            'gstIn',
            'e_way_bill',
            'enableTds',
            'tanRegistrationNo',
            'tanNo',
            'deductorType'
        ];

        const missingFields = [];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        }

        if (missingFields.length > 0) {
            return res.status(400).send({
                message: "Required fields are missing",
                missingFields: missingFields
            });
        }
   
      const old = await companyModel.findOne({businessName})
      if(old){
      return   res.send({
            success:false,message:"this business already exist"
        })
      }

       const data = await companyModel.create({
        businessName,
        address,
        b_state,
        country,
        pinCode,
        contact,
        email,
        website,
        financialYear,
        bookFrom,
        s_state,
        tax_Rate,
        taxable_value,
        gstIn,
        e_way_bill,
        enableTds,
        tanRegistrationNo,
        tanNo,
        deductorType
        

       })
       if(data){
        res.status(201).send({success:true,message:"company registration successfully",data})
       }

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" ,error});
    }
}
    