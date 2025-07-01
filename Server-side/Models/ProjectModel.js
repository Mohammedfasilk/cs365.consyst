const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    po_value: Number,
    additional_po_value: Number,
    total_po_value: Number,
    invoice_supply: Number,
    invoice_service: Number,
    additional_invoice: Number,
    billing_total: Number,
    cogs: Number,
    packing_and_forwarding: Number,
    travel_expenses: Number,
    travel_allowances: Number,
    commissioning: Number,
    programming_outsourced: Number,
    installation_subcontract: Number,
    extended_warranty_cost: Number,
    miscellaneous_direct_expense: Number,
    total_direct_expenses: Number,
    gross_profit_amount: Number,
    gross_profit_percent: Number,
    investor_profit_share_percent: Number,
    investor_profit_share_amount: Number,
    miscellaneous_indirect_expense: Number,
    total_indirect_expenses: Number,
    total_expenses: Number,
    net_profit_loss: Number,
    net_profit_loss_percent: Number,
  }
);

const timelineSchema = new mongoose.Schema(
  {
    id:{
        type:Number,
        default:0,
    },
    task: {
      type: String,
      required: true,
      trim: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
);


const monthlyDataSchema = new mongoose.Schema({
  month: { type: String, required: true },
  current: budgetSchema,
  projected: budgetSchema,
  status:{type:String,default:'draft'},
  stage:{type:String,default:'open'},

},{ _id: false })


const projectSchema = new mongoose.Schema(
  {
    commencement_date: { type: String, required: true },

    contract_end_date: { type: String, required: true },

    customer_po_date: { type: String, required: true },

    fat_date: { type: String, required: true },

    material_delivery_date: { type: String, required: true },

    company: { type: String },

    customer_name: { type: String },

    customer_po_value: { type: Number },

    project_currency: { type: String },

    project_description: { type: String },

    project_name: { type: String, required: true },

    project_title: { type: String, required: true },

    stage: { type: String },

    status: { type: String },

    budget: budgetSchema,

    monthly_cost_control: [monthlyDataSchema],

    timeline:[timelineSchema],
  }
);

module.exports = mongoose.model('Project', projectSchema);