import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

//creating an array of files with names in title case
//then attempting to delete all records from files and returning error if it fails
async function deleteAllData(orderedFileNames: string[]){
    const modelNames = orderedFileNames.map((fileName) => {
        const modelName = path.basename(fileName, path.extname(fileName));
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    });

    for(const modelName of modelNames){
        const model: any = prisma[modelName as keyof typeof prisma];
        try{
            await model.deleteMany({});
            console.log(`Cleared data from ${modelName}`)
        }catch(error){
            console.error(`Error clearing data from ${modelName}:`, error);
        }
    }
}

//creates an array of ordered file names under seedData directory
async function main(){
    const dataDirectory = path.join(__dirname, "seedData");
        const orderedFileNames = [
            "team.json",
            "project.json",
            "projectTeam.json",
            "user.json",
            "task.json",
            "attachment.json",
            "comment.json",
            "taskAssignment.json",
        ];

        //clears what already exists 
        await deleteAllData(orderedFileNames);
        //iterates over orderedFileNames to perform these actions and assign variables to them     
        for(const fileName of orderedFileNames){
           const filePath = path.join(dataDirectory, fileName);
           const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
           const modelName = path.basename(fileName, path.extname(fileName));
           const model: any = prisma[modelName as keyof typeof prisma];

           try{
            //iterates over jsonData to create seed data
            for(const data of jsonData){
                await model.create({ data });
            }
            console.log(`Seeded ${modelName} with data from ${fileName}`);
           }catch(error){
            console.error(`Error seeding data for ${modelName}:`, error);
           }
        }
} 

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());