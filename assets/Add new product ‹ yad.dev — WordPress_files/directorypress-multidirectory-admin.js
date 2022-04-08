(function( $ ) {
	'use strict';
	
	jQuery(document).on('click', 'a.create', function (e) { 
		jQuery('#create_new_directory .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpmd_create_new_action'},
			dataType: "html",
			success: function (response) {
				jQuery('#create_new_directory .modal-body').find(loader_wrapper).remove();
				jQuery('#create_new_directory .modal-body').html(response);
				//jQuery('#create_new_directory .modal-body form .id').html('<input type="hidden" name="id" value="'+directory_id+'">');
				jQuery('#create_new_directory .modal-body #labels').tab('show');
				$('.directorypress-select2').select2();
				
			}
		});
    });
	jQuery(document).on('click', '.new-directory-action-button', function (e) {
        e.preventDefault();  
        var _this = jQuery('#create_new_directory form');
		var Form = _this.serialize();
        jQuery('#create_new_directory .modal-body').append(loader);
		//console.log(Form);
        jQuery.ajax({
            type: "POST",
            url: directorypress_js_instance.ajaxurl,
			data: Form + '&action=dpmd_create_new',
            dataType: "html",
            success: function (response) {
				jQuery('#create_new_directory .modal-body').find(loader_wrapper).remove();
				jQuery('#create_new_directory .modal-body').html(response);
				//jQuery('#create_new_directory .modal-footer').find('.new-directory-action-button').remove();
				jQuery('#create_new_directory .modal-footer').find('.cancel-btn').text('Close');
				directories_list();
            }
        });
    });
	jQuery(document).on('click', '#directory_configure .delete', function (e) { 
        var _this = jQuery(this);
		var directory_id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary delete-directory-action-button" data-id="'+directory_id+'">Delete</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		
		jQuery('#directory_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpmd_delete_action', 'directory_id': directory_id},
			dataType: "html",
			success: function (response) {
				jQuery('#directory_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#directory_configure .modal-body').html(response);	
				jQuery('#directory_configure .modal-footer').html(footer);	
			}
		});
    });
	jQuery(document).on('click', '#directory_configure .delete-directory-action-button', function (e) { 
		var directory_id = jQuery("#directory_configure input[name='directory_id']"). val();
		var new_directory_id = jQuery("#directory_configure input[name='new_directory']:checked"). val();
		jQuery('#directory_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpmd_delete', 'directory_id': directory_id, 'new_directory_id': new_directory_id},
			dataType: "html",
			success: function (response) {
				jQuery('#directory_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#directory_configure .modal-body').html(response);	
				//jQuery('#directory_configure .modal-footer').find('.delete-directory-action-button').remove();
				jQuery('#directory_configure .modal-footer').find('.cancel-btn').text('Close');
				directories_list();
			}
		});
    });
	jQuery(document).on('click', '#directory_configure .edit', function (e) { 
        var _this = jQuery(this);
		var directory_id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary edit-directory-action-button" data-id="'+directory_id+'">Save</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		jQuery('#directory_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpmd_edit_action', 'directory_id': directory_id},
			dataType: "html",
			success: function (response) {
				jQuery('#directory_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#directory_configure .modal-body').html(response);
				jQuery('#directory_configure .modal-body form .id').html('<input type="hidden" name="id" value="'+directory_id+'">');
				jQuery('#directory_configure .modal-body #labels').tab('show');
				$('.directorypress-select2').select2();
				jQuery('#directory_configure .modal-footer').html(footer);	
				
			}
		});
    });
	jQuery(document).on('click', '#directory_configure .edit-directory-action-button', function (e) {
		var Form = jQuery('#directory_configure form.add-edit').serialize();	
		jQuery('#directory_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: Form + '&action=dpmd_edit',
			dataType: "html",
			success: function (response) {
				jQuery('#directory_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#directory_configure .modal-body').html(response);	
				jQuery('#directory_configure .modal-footer').find('.edit-directory-action-button').remove();
				jQuery('#directory_configure .modal-footer').find('.cancel-btn').text('Close');
			}
		});
    });
	jQuery(document).on('click', 'a.directory_configure', function (e) {
		var _this = jQuery(this);
		var directory_id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary edit" data-id="'+directory_id+'">Edit</button><button type="button" class="btn btn-primary delete" data-id="'+directory_id+'">Delete</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		jQuery('#directory_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dpmd_configure', 'directory_id': directory_id},
			dataType: "html",
			success: function (response) {
				jQuery('#directory_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#directory_configure .modal-body').html(response);
				jQuery('#directory_configure .modal-footer').html(footer);
				
			}
		});
    });
	window.directories_list = function () {
		jQuery(document).on('hide.bs.modal', '.directorypress-admin-modal', function () {
			jQuery('#directories_list form').append(loader);
			jQuery.ajax({
				type: "POST",
				url: directorypress_js_instance.ajaxurl,
				data: { 'action': 'dpmd_directory_list'},
				dataType: "html",
				success: function (response) {
					jQuery('#directories_list form').find(loader_wrapper).remove();
					jQuery('#directories_list form').html(response);	
				}
			});
		});
		 
	};
})( jQuery );
