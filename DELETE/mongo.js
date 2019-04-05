mongoexport --host localhost:27017 --db EHF --collection products --type csv -f Product_Name,Category_type,SKU,Product_Shipping_Weight,Product_Shipping_Weight_2,Product_Weight,UPC,Color,Number_of_Cartons,Cubic_Feet,Packing_Carton_Width,Packing_Carton_Depth,Packing_Carton_Height,Actual_Product_Length,Actual_Product_Width,Actual_Product_Height,Drawer_Length,Drawer_Width,Drawer_height,Shelf_Length,Shelf_Width,Materials,Inches_in_between_shelf,Drawerheight,Product_Description,Feature_1,Feature_2,Feature_3,Feature_4,Feature_5,Feature_6,Feature_7,Care_Instructions,Assembly_required,Product_Shipping_Method,wholesale_price,Retail,Warranty,images --out C:/Users/David/Desktop/products.csv

mongoimport -d EHF -c products --type csv --file C:/Users/David/Desktop/EHF-Marketplace-Product_CSV/products-Temp-2.csv --headerline

//================================================================


// It's very simple to import a .bson file:
  mongorestore -d db_name -c collection_name /path/file.bson
// Incase only for a single collection.Try this:
  mongorestore --drop -d db_name -c collection_name /path/file.bson
// For restoring the complete folder exported by mongodump:
  mongorestore -d db_name /path/

// ===============================================================
use ehfdb
show collections
db.thecollection.find().pretty();


// =====================csv=========================================
mongoimport -d ehf -c products --type csv --file ./products.csv --headerline
