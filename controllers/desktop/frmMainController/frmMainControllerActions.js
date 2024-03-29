define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnLoad **/
    AS_Button_f8b0fa8904244d5eb1e5b6602b80923f: function AS_Button_f8b0fa8904244d5eb1e5b6602b80923f(eventobject) {
        var self = this;
        return self.getExcel.call(this);
    },
    /** onClick defined for btnExport **/
    AS_Button_gdb24cc969b0415b9bd1f52e85d1e5b2: function AS_Button_gdb24cc969b0415b9bd1f52e85d1e5b2(eventobject) {
        var self = this;
        return self.exportData.call(this);
    },
    /** onSelection defined for radioSwitch **/
    AS_RadioButtonGroup_ac42eeb8a4a249c48fbe19c7fc854bda: function AS_RadioButtonGroup_ac42eeb8a4a249c48fbe19c7fc854bda(eventobject) {
        var self = this;
        if (self.view.radioSwitch.selectedKey === 'rbg2') {
            self.view.txtAreaJSON.isVisible = false;
        } else {
            self.view.txtAreaJSON.isVisible = true;
        }
    }
});