/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * minimal-select.js
 *
 * This is a minimal footprint select control which has no box around it.
 * A small arrow next to the control indicates that it is an interactive
 * control.
 *
 * Another advantage of this control is that the selected item can be
 * styled with a large font to grab attention. A native control usually
 * is hard to style this way.
 *
 * @author Naresh Bhatia
 */
$.widget('archfirst.minimalselect', {
    version: '0.1.0',

    options: {
        // Required options:
        // collection
        // labelPath
        // valuePath
        // defaultOption

        // callbacks
        change: null
    },

    selectedItem: null,

    _create: function() {
        'use strict';

        var self = this;
        var labelPath = this.options.labelPath;
        var valuePath = this.options.valuePath;


        // Find the selected item
        $.each(this.options.collection, function(index, item) {
            if (item[valuePath] === self.options.defaultOption) {
                self.selectedItem = item;
                return false;
            }
        });


        // Create the markup as shown in the following example:
        // <div class="phone-selector minimalselect-container">
        //
        //     <span class="minimalselect-selected">
        //         <span class="minimalselect-label">Samsung Galaxy S4</span>
        //         <img src="img/arrow-blue.png" />
        //     </span>
        //
        //     <ul class="minimalselect-drop">
        //         <li>Samsung Galaxy S4</li>
        //         <li>Apple iPhone 5</li>
        //         <li>HTC One</li>
        //         <li>Google nexus 4</li>
        //     </ul>
        //
        // </div>

        this.element.addClass('minimalselect-container');

        var html = '';
        html += '<span class="minimalselect-selected">';
        html += '<span class="minimalselect-label">' + self.selectedItem[labelPath] + '</span> ';
        html += '<img src="img/arrow-blue.png" />';
        html += '</span>';

        html += '<ul class="minimalselect-drop">';

        $.each(this.options.collection, function(index, item) {
            html += '<li>' + item[labelPath] + '</li>';
        });

        html += '</ul>';

        this.element.html(html);

        // Save references to key elements
        this.selectedElement = this.element.find('.minimalselect-selected');
        this.labelElement = this.element.find('.minimalselect-label');
        this.dropElement = this.element.find('.minimalselect-drop');
        this.optionElements = this.element.find('.minimalselect-drop li');


        // Add event handlers

        // If user clicks outside the minimalselect, then hide the dropdown
        $('html').click(function() {
            self.dropElement.hide();
        });

        // If user clicks inside the minimalselect, then show the dropdown
        // Prevent the event from propagating up, otherwise the
        // clik handler at the document level will close it
        this.selectedElement.click(function(event) {
            self.dropElement.show();
            event.stopPropagation();
        });

        this.optionElements.mouseover(function() {
            $(this).addClass('minimalselect-highlight');
        })
        .mouseout(function() {
            $(this).removeClass('minimalselect-highlight');
        })
        .click(function(event) {
            self.dropElement.hide();
            self.labelElement.html($(this).text());
            self.selectedItem = self.options.collection[$(this).index()];
            self._trigger('change', event, { value: self.selectedItem[valuePath] });
        });
    },

    _destroy: function() {
        'use strict';

        // remove generated elements
        this.element.empty();

        this.element.removeClass('minimalselect-container');
    }
});