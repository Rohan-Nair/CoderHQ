import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a problem name"],
    },
    title: {
        type: String,
        required: [true, "Please provide a problem title"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a problem description"],
    },
    input: {
        type: String,
        required: [true, "Please provide a problem input"],
    },
    output: {
        type: String,
        required: [true, "Please provide a problem output"],
    },
});

const ProblemModel = mongoose.models.ProblemModel || mongoose.model('Problem', problemSchema);
export default ProblemModel;
