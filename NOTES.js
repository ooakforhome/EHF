
// import csv into mongodb database
C:\User\Home>mongoimport -d dbname -c collectionname --type csv --file filename.csv --headerline

//-------------------------------------------------------------------

C:\User\Home>
mongoimport -d EHF_SITE -c products  --type csv --fields shop.ObjectId\(\) --columnsHaveTypes --file C:\Users\David\Desktop\EHF-Product_CSV\accent2.csv --headerline

//bath
mongoimport -d EHF_SITE -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\EHF_SITE\bath.csv --headerline

//bathaccessories
mongoimport -d EHF_SITE -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\EHF_SITE\bathaccessories.csv --headerline

mongoimport -h foohost -d bardb -c fooc --type tsv --fields col1.int32\(\),col2.double\(\),col3.string\(\) --columnsHaveTypes --file path/to/file.txt

https://stackoverflow.com/questions/24223443/mongoimport-choosing-field-type
//-------------------------
// //accent
// mongoimport -d EHF -c accents --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\accent.csv --headerline
//
// //bath
// mongoimport -d EHF -c baths --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\bath.csv --headerline
//
// //bathaccessories
// mongoimport -d EHF -c bathaccessories --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\bathaccessories.csv --headerline
//
// //bathhardware
// mongoimport -d EHF -c bathhardwares --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\bathhardware.csv --headerline
//
// //bookcase
// mongoimport -d EHF -c bookcases --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\bookcase.csv --headerline
//
// //beautydevices
// mongoimport -d EHF -c beautydevices --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\beautydevice.csv --headerline
//
// //garden
// mongoimport -d EHF -c gardens --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\garden.csv --headerline
//
// //hooknrod
// mongoimport -d EHF -c hooknrods --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\hooknrod.csv --headerline
//
// //led
// mongoimport -d EHF -c outdoorlightings --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\led.csv --headerline
//
// //otd
// mongoimport -d EHF -c otds --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\otd.csv --headerline
//
// //pet
// mongoimport -d EHF -c pets --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\pet.csv --headerline
//
// //showercurtain
// mongoimport -d EHF -c showercurtains --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\showercurtain.csv --headerline
//
// //windowhardware
// mongoimport -d EHF -c windowhardwares --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\windowhardware.csv --headerline
//
// //windowpanel
// mongoimport -d EHF -c windowpanels --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\windowpanel.csv --headerline

//=====================================================================


//All data in products
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\windowpanel.csv --headerline

//accent
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\accent.csv --headerline

//bath
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\bath.csv --headerline

//bathaccessories
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\bathaccessories.csv --headerline

//bathhardware
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\bathhardware.csv --headerline

//bookcase
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\bookcase.csv --headerline

//beautydevices
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\beautydevice.csv --headerline

//garden
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\garden.csv --headerline

//hooknrod
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\hooknrod.csv --headerline

//led
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\led.csv --headerline

//otd
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\otd.csv --headerline

//pet
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\pet.csv --headerline

//showercurtain
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\showercurtain.csv --headerline

//windowhardware
mongoimport -d EHF -c products --type csv --file C:\Users\David\Desktop\EHF-Product_CSV\windowhardware.csv --headerline
//============================================================================
// docker file => git repo => jenkins server => test, staging, production
// sudo docker install docker engine
// sudo service docker start
// sudo docker pull ${image, example ubuntu}
// sudo docker run -it ${imageID}
// sudo apt-get install pip
// sudo pip install docker compose
// mkdir workpress
// wordpress>  sudo gedit docker-compose.yml
