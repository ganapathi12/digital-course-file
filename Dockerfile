FROM node:15
WORKDIR /app
COPY /digital-course-file/package.json .
RUN npm install --force
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
