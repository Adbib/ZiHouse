(function( $ ) {
	'use strict';
	
	jQuery(document).on('click', 'a.create', function (e) { 
		jQuery('#create_new_locationlevel .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpel_create_new_action'},
			dataType: "html",
			success: function (response) {
				jQuery('#create_new_locationlevel .modal-body').find(loader_wrapper).remove();
				jQuery('#create_new_locationlevel .modal-body').html(response);		
			}
		});
    });
	jQuery(document).on('click', '.new-locationlevel-action-button', function (e) {
        e.preventDefault();  
        var _this = jQuery('#create_new_locationlevel form');
		var Form = _this.serialize();
        jQuery('#create_new_locationlevel .modal-body').append(loader);
		//console.log(Form);
        jQuery.ajax({
            type: "POST",
            url: directorypress_js_instance.ajaxurl,
			data: Form + '&action=dpel_create_new',
            dataType: "html",
            success: function (response) {
				jQuery('#create_new_locationlevel .modal-body').find(loader_wrapper).remove();
				jQuery('#create_new_locationlevel .modal-body').html(response);
				jQuery('#create_new_locationlevel .modal-footer').find('.cancel-btn').text('Close');
				locations_list();
            }
        });
    });
	jQuery(document).on('click', '#locationlevel_configure .delete', function (e) { 
        var _this = jQuery(this);
		var id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary delete-locationlevel-action-button" data-id="'+id+'">Delete</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		
		jQuery('#locationlevel_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpel_delete_action', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#locationlevel_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#locationlevel_configure .modal-body').html(response);	
				jQuery('#locationlevel_configure .modal-footer').html(footer);	
			}
		});
    });
	jQuery(document).on('click', '#locationlevel_configure .delete-locationlevel-action-button', function (e) { 
		var id = jQuery("#locationlevel_configure input[name='id']"). val();
		jQuery('#locationlevel_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpel_delete', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#locationlevel_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#locationlevel_configure .modal-body').html(response);	
				jQuery('#locationlevel_configure .modal-footer').find('.cancel-btn').text('Close');
				locations_list();
			}
		});
    });
	jQuery(document).on('click', '#locationlevel_configure .edit', function (e) { 
        var _this = jQuery(this);
		var id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary edit-locationlevel-action-button" data-id="'+id+'">Save</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		jQuery('#locationlevel_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpel_edit_action', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#locationlevel_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#locationlevel_configure .modal-body').html(response);
				jQuery('#locationlevel_configure .modal-body form .id').html('<input type="hidden" name="id" value="'+id+'">');
				jQuery('#locationlevel_configure .modal-footer').html(footer);
			}
		});
    });
	jQuery(document).on('click', '#locationlevel_configure .edit-locationlevel-action-button', function (e) {
		var Form = jQuery('#locationlevel_configure form.add-edit').serialize();	
		jQuery('#locationlevel_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: Form + '&action=dpel_edit',
			dataType: "html",
			success: function (response) {
				jQuery('#locationlevel_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#locationlevel_configure .modal-body').html(response);	
				//jQuery('#locationlevel_configure .modal-footer').find('.edit-locationlevel-action-button').remove();
				jQuery('#locationlevel_configure .modal-footer').find('.cancel-btn').text('Close');
				locations_list();
			}
		});
    });
	jQuery(document).on('click', 'a.locationlevel_configure', function (e) {
		var _this = jQuery(this);
		var id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary edit" data-id="'+id+'">Edit</button><button type="button" class="btn btn-primary delete" data-id="'+id+'">Delete</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		jQuery('#locationlevel_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpel_configure', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#locationlevel_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#locationlevel_configure .modal-body').html(response);
				jQuery('#locationlevel_configure .modal-footer').html(footer);
				
			}
		});
    });
	window.locations_list = function () {
		jQuery(document).on('hide.bs.modal', '.directorypress-admin-modal', function () {
			jQuery('#locations_list').append(loader);
			jQuery.ajax({
				type: "POST",
				url: directorypress_js_instance.ajaxurl,
				data: { 'action': 'dpel_location_list'},
				dataType: "html",
				success: function (response) {
					jQuery('#locations_list').find(loader_wrapper).remove();
					jQuery('#locations_list').html(response);	
				}
			});
		});
		 
	};
})( jQuery );
