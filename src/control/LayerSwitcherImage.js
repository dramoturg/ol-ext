/*	Copyright (c) 2016 Jean-Marc VIGLINO, 
	released under the CeCILL-B license (French BSD license)
	(http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/

import {inherits as ol_inherits} from 'ol'
import ol_control_LayerSwitcher from './LayerSwitcher'

/**
 * @classdesc OpenLayers 3 Layer Switcher Control.
 * @require layer.getPreview
 * @require jQuery
 *
 * @constructor
 * @extends {ol_control_LayerSwitcher}
 * @param {Object=} options Control options.
 */
var ol_control_LayerSwitcherImage = function(options)
{	options = options || {};
	options.switcherClass="ol-layerswitcher-image";
	if (options.mouseover!==false) options.mouseover=true;
	ol_control_LayerSwitcher.call(this, options);
};
ol_inherits(ol_control_LayerSwitcherImage, ol_control_LayerSwitcher);

/** Render a list of layer
 * @param {elt} element to render
 * @layers {Array{ol.layer}} list of layer to show
 * @api stable
 */
ol_control_LayerSwitcherImage.prototype.drawList = function(ul, layers)
{	var self = this;
	var originUl = ul instanceof jQuery ? ul.get(0) : ul;

	var setVisibility = function(layer) {
		return function (e) {
			e.preventDefault();
			self.switchLayerVisibility(layer, layers);
			if (e.type === 'touchstart') self.element.classList.add('ol-collapsed');
		};
	};

	originUl.style.height = 'auto';

	layers.forEach(function(layer)
	{
		if (self.displayInLayerSwitcher(layer)) {

			var prev = layer.getPreview ? layer.getPreview() : ["none"];
			var d = document.createElement('li');
			d.classList.add('ol-imgcontainer');
			// TODO: replace jquery data set on vanila
			$(d).data('layer', layer);
			d.addEventListener('click', setVisibility(layer));
			d.addEventListener('touchstart', setVisibility(layer));
			if (layer.getVisible()) {
				d.classList.add("select");
			}
			for (var k=0; k<prev.length; k++)
			{
				var img = document.createElement('img');
				img.setAttribute('src', prev[k]);
				d.appendChild(img);
			}
			var title = document.createElement('p');
			title.textContent = layer.get("title") || layer.get("name");
			d.appendChild(title);
			if (self.testLayerVisibility(layer))
			{
				d.classList.add("ol-layer-hidden");
			}
			originUl.appendChild(d)
		}
	});
};


/** Disable overflow
*/
ol_control_LayerSwitcherImage.prototype.overflow = function(){};

export default ol_control_LayerSwitcherImage
