   // MAterial Date picker 
   function init_plugin_material_clock() {
       $('#mdate').bootstrapMaterialDatePicker({ weekStart: 0, time: false });
       $('#timepicker').bootstrapMaterialDatePicker({ format: 'HH:mm', time: true, date: false });
       $('#date-format').bootstrapMaterialDatePicker({ format: 'dddd DD MMMM YYYY - HH:mm' });

       $('#min-date').bootstrapMaterialDatePicker({ format: 'DD/MM/YYYY HH:mm', minDate: new Date() });
       // Clock pickers
       $('#single-input').clockpicker({
           placement: 'top',
           align: 'left',
           autoclose: true,
           'default': 'now'
       });
       //    $('.clockpicker').clockpicker({
       //        placement: 'top',
       //        align: 'left',
       //        autoclose: true,
       //        'default': 'now',
       //        donetext: 'Done'
       //    });
       //    .find('input').change(function() {
       //        console.log(this.value);
       //    });
       $('#check-minutes').click(function(e) {
           // Have to stop propagation here
           e.stopPropagation();
           input.clockpicker('show').clockpicker('toggleView', 'minutes');
       });
       if (/mobile/i.test(navigator.userAgent)) {
           $('input').prop('readOnly', true);
       }
       // Colorpicker
       $(".colorpicker").asColorPicker();
       $(".complex-colorpicker").asColorPicker({
           mode: 'complex'
       });
       $(".gradient-colorpicker").asColorPicker({
           mode: 'gradient'
       });
       // Date Picker
       jQuery('.mydatepicker, #datepicker').datepicker();
       jQuery('#datepicker-autoclose').datepicker({
           autoclose: true,
           todayHighlight: true
       });
       jQuery('#date-range').datepicker({
           toggleActive: true
       });
       jQuery('#datepicker-inline').datepicker({
           todayHighlight: true
       });
       // Daterange picker
       $('.input-daterange-datepicker').daterangepicker({
           buttonClasses: ['btn', 'btn-sm'],
           applyClass: 'btn-danger',
           cancelClass: 'btn-inverse'
       });
       $('.input-daterange-timepicker').daterangepicker({
           timePicker: true,
           format: 'MM/DD/YYYY h:mm A',
           timePickerIncrement: 30,
           timePicker12Hour: true,
           timePickerSeconds: false,
           buttonClasses: ['btn', 'btn-sm'],
           applyClass: 'btn-danger',
           cancelClass: 'btn-inverse'
       });
       $('.input-limit-datepicker').daterangepicker({
           format: 'MM/DD/YYYY',
           minDate: '01/01/2018',
           maxDate: '01/30/2018',
           buttonClasses: ['btn', 'btn-sm'],
           applyClass: 'btn-danger',
           cancelClass: 'btn-inverse',
           dateLimit: {
               days: 6
           }
       });
   }