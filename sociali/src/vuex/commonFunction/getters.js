export function message () {
	return function (self, type, message) {
		this.$message({
			type, message
		});
	};
}