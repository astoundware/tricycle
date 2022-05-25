makefile:
output = Tricycle.dmg

notarize:
	xcrun altool --notarize-app --primary-bundle-id "com.astound.tricycle" --username $(username) --password "$(password)" --file $(output)

staple:
	xcrun stapler staple $(output)

copy:
	cp $(output) $(location)
