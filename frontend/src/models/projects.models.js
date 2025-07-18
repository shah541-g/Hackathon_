import mongoose, { Mongoose } from "mongoose";
import { type } from "os";

const projectSchema = new mongoose.Schema({
    prompts: {

    },
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        maxlength: [50, 'name cannot exceed 50 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ['pending', 'completed', 'deployed'],
    },
    deployedURL: {
        type: String
    },
    requirments: {
        type: mongoose.Schema.Types.Mixed,
        default: []
    },
    stringStucture: {
        type: String,
        default: `
├── .git/
├── node_modules/
├── package-lock.json
├── package.json
├── src/
│   └── app/
│       ├── page.tsx
│       ├── layout.tsx
│       ├── favicon.ico
│       └── globals.css
├── public/
│   ├── window.svg
│   ├── vercel.svg
│   ├── next.svg
│   ├── globe.svg
│   └── file.svg
├── tsconfig.json
├── next.config.ts
├── next-env.d.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── README.md
└── .gitignore`
    }
}, {
    timestamps: true
})


export default   mongoose.model('Project', projectSchema);