// Modeling for each fractal block

// 
// 
// 
// FracBlock Object
// 
// 
// 
var FracBlock = function(num){
	this.numRows = num;
	// init num rows based on num
	this.data = new Array(num);
	
	// 1d array;0 means nothing there,
	// 			1 means 1 dot,
	//			2 means 2 dots
	for (var i = 0; i < num, i++){
		this.data[i] = 0;
	}
}

// function that checks if this block was instantiated correctly
FracBlock.prototype.checkInit = function(){
	// none of entries in data can be 0
	for (var i = 0; i < this.numRows; i++){
		if (this.data[i] == 0){
			return false;
		}
	}
	return true;
}

// function that sets block's array data
FracBlock.prototype.setData = function(arr){
	// dimension check
	if (arr.length != this.numRows){
		return false;
	}
	for (var i = 0; i < this.numRows; i++){
		this.data[i] = arr[i];
	}
}

// 
// 
// 
// Joining blocks
// 
// 
// 

// (Horizontal motion)
// Function that binarily joins 2 fractal blocks together,
// returns a new block
function binJoinBlocks(block1, block2){
	// only join if same dimensions and initialized correctly
	if (block1.numRows != block2.numRows){
		return false;
	}
	if (!(block1.checkInit() && block2.checkInit())) {
		return false;
	}

	var finalBlock = new FracBlock(block1.numRows);
	var newArr = new Array(block1.numRows);
	for (var i = 0; i < block1.numRows; i++){
		block1Val = block1.data[i];
		block2Val = block2.data[i];
		finalVal;
		// even + even = even (2+2 = 2)
		// odd + even = odd   (2+1 = 1)
		// odd + odd = even (1+1 = 2)

		// even even case
		if (block1Val + block2Val == 4){
			finalVal = 2;
		}
		// odd even case
		else if (block1Val + block2Val == 3){
			finalVal = 1;
		}
		// odd odd case
		else if (block1Val + block2Val == 2){
			finalVal = 2;
		}

		newArr[i] = finalVal;
	}
	finalBlock.setData(newArr);
	return finalBlock;
}

// (Vertical motion)
// function that physicall joins 2 fractal blocks together
function physicalJoinBlocks(block1, block2){
	// check that all entries are not 0
	if (!(block1.checkInit() && block2.checkInit())) {
		return false;
	}
	var finalBlock = new FracBlock(block1.numRows+block2.numRows);
	// literally join them together by concatenation
	var newArr = block1.data.concat(block2.data);
	finalBlock.setData(newArr);
	return finalBlock;
}