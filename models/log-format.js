import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true,
        index: true
    },
    resourceId: {
        type: String,
        required: true,
        index: true
    },
    timestamp: {
        type: Date,
        required: true,
        index: true
    },
    traceId: {
        type: String,
        required: true,
        index: true
    },
    spanId: {
        type: String,
        required: true,
        index: true
    },
    commit: {
        type: String,
        required: true,
        index: true
    },
    metadata: {
        parentResourceId: {
            type: String,
            required: true,
            index: true
        }

    }
});

  
 logSchema.index({
    level: 'text',
    message: 'text',
    resourceId: 'text',
    traceId: 'text',
    spanId: 'text', 
    commit: 'text',
    timestamp: 'text', 
    'metadata.parentResourceId': 'text', 
});
const Log = mongoose.model('Log', logSchema);

export default Log;
