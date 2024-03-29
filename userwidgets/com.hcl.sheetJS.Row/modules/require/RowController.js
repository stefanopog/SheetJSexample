define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    addCell(value){
      const cell = new com.hcl.sheetJS.Cell({
        id: `cell${Math.floor(Math.random() * 10000)}${new Date().getTime()}`
      }, {}, {});
      cell.value = `${value || ''}`;
      this.view.add(cell);
    },

    removeAllCells(){
      this.view.removeAll();
    },
    
    getCells(){
      return this.view.widgets();
    }
  };
});