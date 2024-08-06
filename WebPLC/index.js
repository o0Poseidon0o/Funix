//////////////////////CẤU HÌNH KẾT NỐI KEPWARE////////////////////
const {TagBuilder, IotGateway} = require('kepserverex-js');
const tagBuilder = new TagBuilder({ namespace: 'Channel1.Device1' });
const iotGateway = new IotGateway({
    host: '127.0.0.1',
    port: 5000
});

/////////////HÀM ĐỌC/GHI DỮ LIỆU XUỐNG KEPWARE(PLC)//////////////
//Đọc dữ liệu
var tagArr = [];
function fn_tagRead(){
	iotGateway.read(TagList).then((data)=>{
		var lodash = require('lodash');
		tagArr = lodash.map(data, (item) => item.v);
		console.log(tagArr);
	});
}
// Ghi dữ liệu
function fn_Data_Write(tag,data){
    tagBuilder.clean();	
    const set_value = tagBuilder
        .write(tag,data)
        .get();
    iotGateway.write(set_value);
}

///////////////////////////ĐỊNH NGHĨA TAG////////////////////////
// Khai báo tag
var tag_Bool 		= 'tag_Bool';
var tag_Integer 	= 'tag_Integer';
var tag_Real 		= 'tag_Real';
 
// Đọc dữ liệu
const TagList = tagBuilder
.read(tag_Bool) 
.read(tag_Integer) 
.read(tag_Real) 
.get();

///////////////////////////QUÉT DỮ LIỆU////////////////////////
// Tạo Timer quét dữ liệu
setInterval(
	() => fn_read_data_scan(),
	1000 //100ms = 1s
);
 
// Quét dữ liệu
function fn_read_data_scan(){
	fn_tagRead();	// Đọc giá trị tag
}
