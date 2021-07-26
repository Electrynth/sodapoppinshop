import json, csv, io

try:
  to_unicode = unicode
except NameError:
  to_unicode = str


products = []
name_to_products = {}
name_to_tags = {}



tag_list = [] # good
tag_frequency = {} # good

with open('tags.csv') as tagfile:
    reader = csv.reader(tagfile)
    for row in reader:
        name_to_tags[row[0]] = []
        for tag in row[1:]:
            if tag:
                name_to_tags[row[0]].append(tag)
                if tag not in tag_list:
                    tag_list.append(tag)
                if tag in tag_frequency:
                    tag_frequency[tag] += 1
                else:
                    tag_frequency[tag] = 1

with open('products.json') as productfile:
    plaintext = productfile.read()
    json_data = json.loads(plaintext)
    products.extend(json_data['all_products'])
    for product in products:
        if product['name'] in name_to_products:
            name_to_products[product['name']].append(product)
        else:
            name_to_products[product['name']] = [product]

base_url = 'https://sodapoppin.shop/listing'
final_products = []
for product_name in name_to_products:
    product = {}
    product['name'] = product_name
    if product_name in name_to_tags:
        product['tags'] = name_to_tags[product_name]
    else:
        product['tags'] = ['Untagged']
    product['variants'] = []
    name_to_products[product_name].reverse()
    for subproduct in name_to_products[product_name]:
        product['listingId'] = subproduct['listingId']
        variant = {}
        variant['id'] = subproduct['id']
        variant['productId'] = 9999
        variant['price'] = subproduct['price']
        variant['productName'] = subproduct['productName']
        variant['frontImage'] = subproduct['imageUrl']
        variant['backImage'] = ''
        if 'additionalImages' in subproduct and 'back' in subproduct['additionalImages']:
            variant['backImage'] = subproduct['additionalImages']['back']['src']
        url_segments = subproduct['url'].split('?')
        variant['url'] = base_url + url_segments[0]
        query_segments = url_segments[1].split('&')
        for query_segment in query_segments:
            if 'pid' in query_segment:
                pid = query_segment.split('=')[-1]
                variant['url'] = variant['url'] + '?product=' + pid
                variant['productId'] = int(pid)

        product['variants'].append(variant)
    product['variants'].sort(key=lambda x: x['productId'])
    final_products.append(product)

with open('final_products.json', 'w', encoding='utf-8') as outfile:
    json_data = {}
    json_data['products'] = final_products
    json_data['tagList'] = []
    for tag in tag_frequency:
        json_data['tagList'].append({ 'name': tag, 'frequency': tag_frequency[tag] });
    json_data['tagList'].sort(key=lambda x: x['frequency'], reverse=True)
    str_ = json.dumps(json_data, indent=4, sort_keys=True, separators=(',', ': '), ensure_ascii=False)
    outfile.write(to_unicode(str_))
