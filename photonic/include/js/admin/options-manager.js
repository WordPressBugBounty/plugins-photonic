jQuery(document).ready(function($) {
	const PhotonicOptions = () => {
		let photonic_submit_button;
		const displayOptionScreen = tabName => {
			const panels = $('.photonic-options-panel');
			const tabs = $('.photonic-section-tabs a');

			panels.hide();
			tabs.removeClass('active');

			let currentPanel = $('.photonic-options-panel[id="' + tabName + '"]');
			let currentTab = $('.photonic-section-tabs a[href="#' + tabName + '"]');

			if (currentPanel.length === 0) {
				currentPanel = panels.eq(0);
				currentTab = tabs.eq(0);
			}

			currentPanel.fadeIn();
			currentTab.addClass('active');
		};

		const setBackground = (thisId, specificElement, specificColor) => {
			var background = '';
			var colorField = "#" + thisId + "-bgcolor";

			if (specificElement !== undefined && colorField === '#' + specificElement) {
				background += 'color=' + specificColor + ';';
			}
			else {
				background += 'color=' + ($(colorField).val() === '' ? $(colorField).data('photonicDefaultColor') : $(colorField).val()) + ';';
			}

			background += 'colortype=' + $("input[name=" + thisId + "-colortype]:checked").val() + ';' +
				'image=' + $("#" + thisId + "-bgimg").val() + ';' +
				'position=' + $("#" + thisId + "-position").val() + ';' +
				'repeat=' + $("#" + thisId + "-repeat").val() + ';' +
				'trans=' + $("#" + thisId + "-trans").val() + ';';

			$('#' + thisId).val(background);
		};

		const setBorderOrBackgroundColor = (element, color) => {
			let thisId = $(element).attr('id');
			let container = $(element).parents('.photonic-background-options');
			if (container.length > 0) { // Background
				setBackground(thisId.substring(0, thisId.indexOf('-')), thisId, color);
			}
		};

		displayOptionScreen(Photonic_Options_JS.category);

		$('.photonic-section-tabs a').on('click', function(e) {
			e.preventDefault();
			const tab = $(this);
			displayOptionScreen(tab.attr('href').substr(1));
		});

		$(".photonic-options-form :input[type='submit']").click(function() {
			// This is needed, otherwise the event handler cannot figure out which button was clicked.
			photonic_submit_button = $(this);
		});

		$('.photonic-options-form').submit(function(event) {
			var value = photonic_submit_button.val();

			if (value.substring(0, 5) === 'Reset') {
				if (!confirm("This will reset your configurations to the original values!!! Are you sure you want to continue? This is not reversible!")) {
					return false;
				}
			}
			else if (value.substring(0, 6) === 'Delete') {
				if (!confirm("This will delete all your Photonic configuration options!!! Are you sure you want to continue? This is not reversible!")) {
					return false;
				}
			}
		});

		$('.photonic-options-form .color').wpColorPicker({
			change: function(event, ui) {
				const input = $(event.target);
				setBorderOrBackgroundColor($(input[0]), ui.color.toString());
			},
			clear: function(event) {
				const input = $($(event.target).siblings('.wp-color-picker')[0]);
				setBorderOrBackgroundColor($(input[0]), $(input[0]).data('photonicDefaultColor'));
			}
		});

		$('.photonic-background-options input[type="radio"], .photonic-background-options input[type="text"], .photonic-background-options select').change(function(event) {
			const thisName = event.currentTarget.name;
			setBackground(thisName.substring(0, thisName.indexOf('-')));
		});

		$('div.photonic-checklist input[type="checkbox"]').change(function() {
			var $clicked = $(this);
			var hidden = $clicked.attr('data-photonic-selection-for');
			var allChecks = $('[data-photonic-selection-for="' + hidden + '"]:checked');
			var selection = [];
			allChecks.each(function(i, v) {
				selection[selection.length] = $(v).attr('data-photonic-value');
			});
			selection = selection.join();
			$('input[name="photonic_options[' + hidden + ']"]').val(selection);
		});

		$('button.photonic-notice-dismiss').click(function(e){
			e.preventDefault();
			var $clicked = $(this);
			var $notice = $clicked.parents('.notice');
			var dismissible = $clicked.attr('data-photonic-dismissible');
			var args = { action: 'photonic_dismiss_warning', dismissible: dismissible, _ajax_nonce: $clicked.data('photonicNonce') };
			$.post(ajaxurl, args, function(data) {
				var response = JSON.parse(data);
				response = Object.keys(response);
				if (response.indexOf(dismissible) > -1) {
					$notice.fadeOut();
				}
			});
		});
	};

	PhotonicOptions();
});
