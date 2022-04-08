(function( $ ) {
	'use strict';
	
	jQuery(document).on('click', 'a.create', function (e) { 
		jQuery('#create_new_package .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dppm_create_new_action'},
			dataType: "html",
			success: function (response) {
				jQuery('#create_new_package .modal-body').find(loader_wrapper).remove();
				jQuery('#create_new_package .modal-body').html(response);
				$('.directorypress-select2').select2();
			}
		});
    });
	jQuery(document).on('click', '.new-package-action-button', function (e) {
        e.preventDefault();  
        var _this = jQuery('#create_new_package form');
		var Form = _this.serialize();
        jQuery('#create_new_package .modal-body').append(loader);
		//console.log(Form);
        jQuery.ajax({
            type: "POST",
            url: directorypress_js_instance.ajaxurl,
			data: Form + '&action=dppm_create_new',
            dataType: "html",
            success: function (response) {
				jQuery('#create_new_package .modal-body').find(loader_wrapper).remove();
				jQuery('#create_new_package .modal-body').html(response);
				jQuery('#create_new_package .modal-footer').find('.cancel-btn').text('Close');
				$('.directorypress-select2').select2();
				packages_list();
            }
        });
    });
	jQuery(document).on('click', '#package_configure .delete', function (e) { 
        var _this = jQuery(this);
		var id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary delete-package-action-button" data-id="'+id+'">Delete</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		
		jQuery('#package_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dppm_delete_action', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#package_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#package_configure .modal-body').html(response);	
				jQuery('#package_configure .modal-footer').html(footer);	
			}
		});
    });
	jQuery(document).on('click', '#package_configure .delete-package-action-button', function (e) { 
		var id = jQuery("#package_configure input[name='id']"). val();
		jQuery('#package_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dppm_delete', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#package_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#package_configure .modal-body').html(response);	
				jQuery('#package_configure .modal-footer').find('.cancel-btn').text('Close');
				packages_list();
			}
		});
    });
	jQuery(document).on('click', '#package_configure .edit', function (e) { 
        var _this = jQuery(this);
		var id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary edit-package-action-button" data-id="'+id+'">Save</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		jQuery('#package_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dppm_edit_action', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#package_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#package_configure .modal-body').html(response);
				jQuery('#package_configure .modal-body form .id').html('<input type="hidden" name="id" value="'+id+'">');
				$('.directorypress-select2').select2();
				jQuery('#package_configure .modal-footer').html(footer);
			}
		});
    });
	jQuery(document).on('click', '#package_configure .edit-package-action-button', function (e) {
		var Form = jQuery('#package_configure form.add-edit').serialize();	
		jQuery('#package_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: Form + '&action=dppm_edit',
			dataType: "html",
			success: function (response) {
				jQuery('#package_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#package_configure .modal-body').html(response);
				$('.directorypress-select2').select2();
				//jQuery('#package_configure .modal-footer').find('.edit-package-action-button').remove();
				jQuery('#package_configure .modal-footer').find('.cancel-btn').text('Close');
				packages_list();
			}
		});
    });
	
	jQuery(document).on('click', '#package_configure .upgrade_downgrade', function (e) { 
        var _this = jQuery(this);
		var id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary upgrade_downgrade-package-action-button" data-id="'+id+'">Save</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		jQuery('#package_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dppm_upgrade_downgrade_action', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#package_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#package_configure .modal-body').html(response);
				jQuery('#package_configure .modal-body form .id').html('<input type="hidden" name="id" value="'+id+'">');
				//$('.directorypress-select2').select2();
				jQuery('#package_configure .modal-footer').html(footer);
			}
		});
    });
	jQuery(document).on('click', '#package_configure .upgrade_downgrade-package-action-button', function (e) {
		var Form = jQuery('#package_configure form.upgrade').serialize();	
		jQuery('#package_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: Form + '&action=dppm_upgrade_downgrade',
			dataType: "html",
			success: function (response) {
				jQuery('#package_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#package_configure .modal-body').html(response);
				//$('.directorypress-select2').select2();
				//jQuery('#package_configure .modal-footer').find('.edit-package-action-button').remove();
				jQuery('#package_configure .modal-footer').find('.cancel-btn').text('Close');
				//packages_list();
			}
		});
    });
	jQuery(document).on('click', 'a.package_configure', function (e) {
		var _this = jQuery(this);
		var id = _this.attr('data-id');
		var footer = '<button type="button" class="btn btn-primary upgrade_downgrade" data-id="'+id+'">Upgrade</button><button type="button" class="btn btn-primary edit" data-id="'+id+'">Edit</button><button type="button" class="btn btn-primary delete" data-id="'+id+'">Delete</button><button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">Cancel</button>';
		jQuery('#package_configure .modal-body').append(loader);
		jQuery.ajax({
			type: "POST",
			url: directorypress_js_instance.ajaxurl,
			data: { 'action': 'dppm_configure', 'id': id},
			dataType: "html",
			success: function (response) {
				jQuery('#package_configure .modal-body').find(loader_wrapper).remove();
				jQuery('#package_configure .modal-body').html(response);
				jQuery('#package_configure .modal-footer').html(footer);
				
			}
		});
    });
	
	window.packages_list = function () {
		jQuery(document).on('hide.bs.modal', '.directorypress-admin-modal', function () {
			jQuery('#packages_list .packages_list_wrapper').append(loader);
			jQuery.ajax({
				type: "POST",
				url: directorypress_js_instance.ajaxurl,
				data: { 'action': 'dppm_package_list'},
				dataType: "html",
				success: function (response) {
					jQuery('#packages_list .packages_list_wrapper').find(loader_wrapper).remove();
					jQuery('#packages_list .packages_list_wrapper').html(response);	
				}
			});
		});
		 
	};
	
	$(function() {
			$("#packages_list .packages_list_wrapper .dp-list-section").sortable({
				placeholder: "ui-sortable-placeholder",
				helper: function(e, ui) {
					ui.children().each(function() {
						//$(this).width($(this).width());
					});
					return ui;
				},
				start: function(e, ui){
					ui.placeholder.height(ui.item.height());
				},
				update: function( event, ui ) {
					$("#packages_order").val($(".package_weight_id").map(function() {
						return $(this).val();
					}).get());
				},
				stop: function( event, ui ) {
					var new_order = $("#packages_order").val();
					$('#packages_list .order-response').append(loader);
					$.ajax({
						type: "POST",
						url: directorypress_js_instance.ajaxurl,
						data: { 'action': 'dppm_reorder', 'new_order': new_order},
						dataType: "html",
						success: function (response) {
							$('#packages_list .order-response').find('.dpbackend-loader-wrapper').remove();
							$('#packages_list .order-response').html(response);	
						}
					});
				}
		    }).disableSelection();
		});
})( jQuery );
