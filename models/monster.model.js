import mongoose from "mongoose";

const geoSchema = new mongoose.Schema({
    lat: String, 
    lng: String
}, {_id: false}); // prevent auto creation of ids for sub documents

const addressSchema = new mongoose.Schema({
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: geoSchema
}, { _id: false });

const companySchema = new mongoose.Schema({
    name: String,
    catchPhrase: String,
    bs: String
}, { _id: false });


const MonsterSchema = new mongoose.Schema({
    id: {type: Number, unique: true },
    name: { type: String, required: true }, 
    username: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: addressSchema, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    company: { type: companySchema, required: true },
    image_url: { type: String, required: true}
});

async function getLatestIdPlusOne() {
    const latestMonster = await Monster.findOne().sort('-id').exec(); // Find the highest id

    if (latestMonster) {
      return latestMonster.id + 1;
    } else {
      return 1; // Start from 1 if no monsters exist
    }
}

MonsterSchema.pre('save', async function(next) {
    if (this.isNew){
        const newId = await getLatestIdPlusOne();
        this.id = newId;
    }
    next();
});

const Monster = mongoose.model('Monster', MonsterSchema);

export default Monster;