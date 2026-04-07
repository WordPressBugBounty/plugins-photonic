document.addEventListener('DOMContentLoaded', () => {
	window.PhotonicWPNativeUI = function(messageChannel) {
		let mediaLibrary;

		const initialize = function(mediaOptions, photonicOptions) {
			mediaLibrary = top.wp.media(mediaOptions);

			mediaLibrary.on('select', () => {
				let selection = mediaLibrary.state().get('selection');
				let selected_data = '';
				selection.map(function (attachment) {
					attachment = attachment.toJSON();
					selected_data += attachment.id + ',';
				});
				selected_data = selected_data.replace(/^,+|,+$/g, '');

				messageChannel.port1.postMessage({
					type: 'photonicReceiveMediaLibrarySelections',
					selection: selected_data,
					options: photonicOptions
				});
			});

			mediaLibrary.on('open', () => {
				const selection = mediaLibrary.state().get('selection');
				let ids = photonicOptions.selectedIds;
				const shortcodeTag = photonicOptions.shortcodeTag;
				const isBlock = photonicOptions.isBlock;

				let editor_selection = photonicOptions.currentShortcode;
				let shortcode, attrs, win = window.dialogArguments || opener || parent || top;
				if (!isBlock && editor_selection && editor_selection !== '') {
					shortcode = top.wp.shortcode.next(shortcodeTag, editor_selection);
					attrs = shortcode.shortcode.attrs.named;
				}
				else if (isBlock) { // Gutenberg
					shortcode = photonicOptions.currentShortcode;
					if (shortcode && shortcode !== '') {
						attrs = JSON.parse(shortcode);
					}
				}

				if (ids === '' && attrs !== undefined) {
					if (attrs.ids !== undefined) {
						ids = attrs.ids;
					}
					else if (attrs.include !== undefined) {
						ids = attrs.include;
					}
				}


				ids = ids.split(',');
				ids.forEach(function (id) {
					const attachment = top.wp.media.attachment(id);
					attachment.fetch();
					selection.add(attachment ? [attachment] : []);
				});
			});
		}

		const open = function() {
			if (mediaLibrary) {
				mediaLibrary.open();
			}
		}

		const closeTB = function() {
			if (typeof tb_close === 'function') {
				tb_close();
			}
			else {
				if (document.getElementById('TB_window')) {
					document.getElementById('TB_window').remove();
				}
				if (document.getElementById('TB_overlay')) {
					document.getElementById('TB_overlay').remove();
				}
			}
		}

		return {
			initializeMediaLibrary: initialize,
			openMediaLibrary: open,
			closeTB: closeTB
		};
	}
});
